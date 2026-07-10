import { type JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assertCondition } from "@/shared/lib";
import { Funnel, Step, type FunnelProps, type StepProps } from "@/shared/ui";
import { useFunnelState } from "./useFunnelState";

const DEFAULT_STEP_QUERY_KEY = "funnel-step";

type NonEmptyArray<T> = readonly [T, ...T[]];

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
}

type UseFunnelReturn<Steps extends NonEmptyArray<string>> = readonly [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions) => void,
] & {
  withState: <StateExcludeStep extends Record<string, unknown>>(
    initialState: StateExcludeStep,
  ) => [
    FunnelComponent<Steps>,
    StateExcludeStep,
    (
      next:
        | Partial<StateExcludeStep & { step: Steps[number] }>
        | ((
            next: Partial<StateExcludeStep & { step: Steps[number] }>,
          ) => StateExcludeStep & { step: Steps[number] }),
    ) => void,
  ];
};

/**
 * 멀티스텝 퍼널(wizard) 훅. 현재 스텝을 URL 쿼리 파라미터에 동기화한다.
 *
 * 기본 반환은 `[FunnelComponent, setStep]` 튜플이며,
 * `.withState(initialState)`를 호출하면 퍼널 전체에 걸친 공유 상태를 함께 관리할 수 있다.
 *
 * @example
 * ```tsx
 * const [Funnel, setStep] = useFunnel(["info", "confirm", "done"] as const);
 *
 * // 상태 포함 사용
 * const [Funnel, state, setState] = useFunnel(["info", "confirm"] as const)
 *   .withState({ name: "", email: "" });
 * ```
 */
export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  },
): UseFunnelReturn<Steps> => {
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  assertCondition(steps.length > 0, "The steps is empty !");

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          const { qsValue } = useQueryString(stepQueryKey);

          const currentStep = qsValue ?? options?.initialStep;

          if (currentStep == null) {
            throw new Error(
              `Assertion failed: Cannot expression current step. Please check the current step value ${currentStep} again !`,
            );
          }

          return <Funnel<Steps> steps={steps} step={currentStep} {...props} />;
        },
        { Step },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set(stepQueryKey, step);

      const newSearch = searchParams.toString();

      options?.onStepChange?.(step);

      void navigate(
        {
          pathname: location.pathname,
          search: `?${newSearch}`,
        },
        {
          replace: setStepOptions?.stepChangeType === "replace",
        },
      );
    },
    [location.search, location.pathname, stepQueryKey, options, navigate],
  );

  type FunnelState = Record<string, unknown>;

  type StepName = Steps[number];

  type NextState = FunnelState & { step?: StepName };

  const [state, _setState] = useFunnelState<FunnelState>({});

  const nextPendingStepRef = useRef<StepName | null>(null);
  const nextStateRef = useRef<Partial<FunnelState> | null>(null);

  const setState = useCallback(
    (next: Partial<NextState> | ((next: Partial<NextState>) => NextState)) => {
      let nextStepValue: Partial<NextState>;

      if (typeof next === "function") {
        nextStepValue = next(state);
      } else {
        nextStepValue = next;
      }

      if (nextStepValue.step) {
        nextPendingStepRef.current = nextStepValue.step;
      }

      nextStateRef.current = nextStepValue;

      _setState(next);
    },
    [_setState, state],
  );

  useEffect(() => {
    if (nextPendingStepRef.current == null) {
      return;
    }

    setStep(nextPendingStepRef.current);

    nextPendingStepRef.current = null;
  }, [setStep, state]);

  const initializedRef = useRef(false);

  function withState<State extends Record<string, unknown>>(
    initialState: State,
  ): [
    FunnelComponent<Steps>,
    State,
    (
      next:
        | Partial<State & { step: Steps[number] }>
        | ((next: Partial<State & { step: Steps[number] }>) => State & { step: Steps[number] }),
    ) => void,
  ] {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }

    return [
      FunnelComponent,
      state as State,
      setState as (
        next:
          | Partial<State & { step: Steps[number] }>
          | ((next: Partial<State & { step: Steps[number] }>) => State & { step: Steps[number] }),
      ) => void,
    ];
  }

  return Object.assign(
    [FunnelComponent, setStep] as readonly [
      FunnelComponent<Steps>,
      (step: Steps[number], options?: SetStepOptions) => void,
    ],
    { withState },
  );
};

const useQueryString = (name: string) => {
  const [value, setValue] = useState<{ [key: string]: string }>({});

  const location = useLocation();
  const navigate = useNavigate();

  const { search } = location;

  useEffect(() => {
    const values = Object.fromEntries(new URLSearchParams(search));

    setValue(values);
  }, [search]);

  return {
    qsValue: value[name],
    set: (params: Record<string, string>) => {
      void navigate({
        pathname: `${location.pathname}`,
        search: new URLSearchParams({ ...value, ...params }).toString(),
      });
    },
  };
};
