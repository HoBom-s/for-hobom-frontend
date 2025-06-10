import * as assert from "assert";
import {
  type JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFunnelState } from "./useFunnelState";
import { Funnel, Step, type FunnelProps, type StepProps } from "../ui/Funnel";

const DEFAULT_STEP_QUERY_KEY: string = "funnel-step";

type NonEmptyArray<T> = readonly [T, ...T[]];

type RouteFunnelStep<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

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

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  },
): readonly [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions) => void,
] & {
  withState: <
    StateExcludeStep extends Record<string, unknown> & { step?: never },
  >(
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
} => {
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  assert(steps.length > 0, "The steps is empty !");

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelStep<Steps>) {
          const { qsValue } = useQueryString(stepQueryKey);

          const currentStep = qsValue ?? options?.initialStep;

          assert(
            currentStep,
            `Cannot expression current step. Please check the current step value ${currentStep} again !`,
          );

          return <Funnel<Steps> steps={steps} step={currentStep} {...props} />;
        },
        { Step },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const url = location.search;

      options?.onStepChange?.(step);

      switch (setStepOptions?.stepChangeType) {
        case "replace":
          navigate(url, {
            replace: true,
          });
          return;

        case "push":
        default:
          navigate(url, {
            replace: false,
          });
          return;
      }
    },
    [location.search, options, navigate],
  );

  type FunnelState = Record<string, unknown>;
  type Step = Steps[number];
  type NextState = FunnelState & { step?: Step };

  const [state, _setState] = useFunnelState<FunnelState>({});

  const nextPendingStepRef = useRef<Step | null>(null);
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
  ) {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }
    return [FunnelComponent, state, setState] as const;
  }

  return Object.assign([FunnelComponent, setStep] as const, {
    withState,
  }) as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => Promise<void>,
  ] & {
    withState: <
      StateExcludeStep extends Record<string, unknown> & { step?: never },
    >(
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
    set: (params: any[]) => {
      navigate({
        pathname: `${location.pathname}`,
        search: new URLSearchParams({ ...value, ...params }).toString(),
      });
    },
  };
};
