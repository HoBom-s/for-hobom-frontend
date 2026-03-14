import { replaceEqualDeep } from "./structural-sharing";
import { Subscribable } from "./subscribable";
import type { QueryKey, QueryOptions, QueryState } from "./types";

const DEFAULT_STALE_TIME = 0;
const DEFAULT_GC_TIME = 5 * 60_000;
const DEFAULT_MAX_RETRY = 3;

const defaultRetryDelay = (attempt: number): number => Math.min(1000 * 2 ** attempt, 30_000);

export class Query<TData = unknown, TError = Error> extends Subscribable {
  readonly queryKey: QueryKey;
  readonly queryHash: string;

  private state: QueryState<TData, TError>;
  private readonly options: QueryOptions<TData>;
  private fetchPromise: Promise<TData> | null = null;
  private abortController: AbortController | null = null;
  private gcTimeout: ReturnType<typeof setTimeout> | null = null;
  private observerCount = 0;
  private gcCallback: (() => void) | null = null;

  constructor(queryHash: string, options: QueryOptions<TData>) {
    super();
    this.queryKey = options.queryKey;
    this.queryHash = queryHash;
    this.options = options;
    this.state = {
      status: "pending",
      data: undefined,
      error: null,
      fetchStatus: "idle",
      dataUpdatedAt: 0,
    };
  }

  getState(): QueryState<TData, TError> {
    return this.state;
  }

  isStale(): boolean {
    if (this.state.status !== "success") return true;
    const staleTime = this.options.staleTime ?? DEFAULT_STALE_TIME;

    return Date.now() - this.state.dataUpdatedAt > staleTime;
  }

  async fetch(): Promise<TData> {
    if (this.fetchPromise) return this.fetchPromise;

    this.abortController = new AbortController();
    this.setState({ fetchStatus: "fetching" });

    this.fetchPromise = this.executeFetch();

    try {
      return await this.fetchPromise;
    } finally {
      this.fetchPromise = null;
    }
  }

  cancel(): void {
    this.abortController?.abort();
    this.fetchPromise = null;
    if (this.state.fetchStatus !== "idle") {
      this.setState({ fetchStatus: "idle" });
    }
  }

  setData(data: TData): void {
    this.setState({
      status: "success",
      data,
      error: null,
      dataUpdatedAt: Date.now(),
    });
  }

  addObserver(): void {
    this.observerCount++;
    this.clearGcTimeout();
  }

  removeObserver(): void {
    this.observerCount = Math.max(0, this.observerCount - 1);
    if (this.observerCount === 0) {
      this.scheduleGc();
    }
  }

  getObserverCount(): number {
    return this.observerCount;
  }

  onGc(callback: () => void): void {
    this.gcCallback = callback;
  }

  destroy(): void {
    this.clearGcTimeout();
    this.listeners.clear();
    this.abortController?.abort();
    this.fetchPromise = null;
  }

  private async executeFetch(): Promise<TData> {
    const maxRetries = this.options.retry === false ? 0 : (this.options.retry ?? DEFAULT_MAX_RETRY);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const rawData = await this.options.queryFn({
          queryKey: this.queryKey,
          signal: this.abortController!.signal,
        });

        const data = replaceEqualDeep(this.state.data, rawData) as TData;

        this.setState({
          status: "success",
          data,
          error: null,
          fetchStatus: "idle",
          dataUpdatedAt: Date.now(),
        });

        return data;
      } catch (error) {
        if (this.abortController?.signal.aborted) {
          this.state = { ...this.state, fetchStatus: "idle" };
          throw error;
        }

        if (attempt === maxRetries) {
          this.setState({
            status: "error",
            error: error as TError,
            fetchStatus: "idle",
          });

          throw error;
        }

        const delay =
          typeof this.options.retryDelay === "function"
            ? this.options.retryDelay(attempt)
            : (this.options.retryDelay ?? defaultRetryDelay(attempt));

        await this.sleep(delay);
      }
    }

    throw new Error("unreachable");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const signal = this.abortController?.signal;

      if (signal?.aborted) {
        reject(signal.reason ?? new Error("aborted"));

        return;
      }

      const onAbort = () => {
        clearTimeout(timer);
        reject(signal?.reason ?? new Error("aborted"));
      };

      const timer = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve();
      }, ms);

      signal?.addEventListener("abort", onAbort, { once: true });
    });
  }

  private setState(partial: Partial<QueryState<TData, TError>>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  private scheduleGc(): void {
    const gcTime = this.options.gcTime ?? DEFAULT_GC_TIME;

    this.gcTimeout = setTimeout(() => {
      this.gcCallback?.();
    }, gcTime);
  }

  private clearGcTimeout(): void {
    if (this.gcTimeout !== null) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = null;
    }
  }
}
