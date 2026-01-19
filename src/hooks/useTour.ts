import { useState, useCallback } from "react";
import type { TourStatus, CallbackType, TourStep } from "../types";

export interface UseTourOptions {
  /**
   * Initial step index
   * @default 0
   */
  initialStepIndex?: number;
  /**
   * Callback when tour status changes
   */
  onStatusChange?: (status: TourStatus, type: CallbackType, step?: TourStep, index?: number) => void;
}

export interface UseTourReturn {
  /**
   * Whether the tour is currently running
   */
  run: boolean;
  /**
   * Current step index
   */
  stepIndex: number;
  /**
   * Start the tour
   */
  start: () => void;
  /**
   * Stop the tour
   */
  stop: () => void;
  /**
   * Pause the tour
   */
  pause: () => void;
  /**
   * Resume the tour
   */
  resume: () => void;
  /**
   * Go to a specific step
   */
  goToStep: (index: number) => void;
  /**
   * Go to next step
   */
  next: () => void;
  /**
   * Go to previous step
   */
  back: () => void;
  /**
   * Skip the tour
   */
  skip: () => void;
  /**
   * Finish the tour
   */
  finish: () => void;
  /**
   * Callback handler for Tour component
   */
  callback: (data: {
    status: TourStatus;
    type: CallbackType;
    index?: number;
    step?: TourStep;
  }) => void;
}

/**
 * Hook for managing tour state
 */
export function useTour(
  steps: TourStep[],
  options: UseTourOptions = {}
): UseTourReturn {
  const { initialStepIndex = 0, onStatusChange } = options;
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(initialStepIndex);

  const start = useCallback(() => {
    setStepIndex(initialStepIndex);
    setRun(true);
    onStatusChange?.("running", "tour:start", steps[initialStepIndex], initialStepIndex);
  }, [initialStepIndex, steps, onStatusChange]);

  const stop = useCallback(() => {
    setRun(false);
    setStepIndex(initialStepIndex);
  }, [initialStepIndex]);

  const pause = useCallback(() => {
    setRun(false);
  }, []);

  const resume = useCallback(() => {
    setRun(true);
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length) {
        setStepIndex(index);
        setRun(true);
        onStatusChange?.("running", "step:after", steps[index], index);
      }
    },
    [steps, onStatusChange]
  );

  const next = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      const newIndex = stepIndex + 1;
      setStepIndex(newIndex);
      onStatusChange?.("running", "step:after", steps[newIndex], newIndex);
    } else {
      finish();
    }
  }, [stepIndex, steps, onStatusChange]);

  const back = useCallback(() => {
    if (stepIndex > 0) {
      const newIndex = stepIndex - 1;
      setStepIndex(newIndex);
      onStatusChange?.("running", "step:after", steps[newIndex], newIndex);
    }
  }, [stepIndex, steps, onStatusChange]);

  const skip = useCallback(() => {
    setRun(false);
    setStepIndex(initialStepIndex);
    onStatusChange?.("skipped", "tour:end", steps[stepIndex], stepIndex);
  }, [initialStepIndex, stepIndex, steps, onStatusChange]);

  const finish = useCallback(() => {
    setRun(false);
    setStepIndex(initialStepIndex);
    onStatusChange?.("finished", "tour:end", steps[stepIndex], stepIndex);
  }, [initialStepIndex, stepIndex, steps, onStatusChange]);

  const callback = useCallback(
    (data: {
      status: TourStatus;
      type: CallbackType;
      index?: number;
      step?: TourStep;
    }) => {
      onStatusChange?.(data.status, data.type, data.step, data.index);

      if (data.status === "finished" || data.status === "skipped") {
        setRun(false);
        setStepIndex(initialStepIndex);
      } else if (data.type === "step:after" && data.index !== undefined) {
        setStepIndex(data.index);
      }
    },
    [initialStepIndex, onStatusChange]
  );

  return {
    run,
    stepIndex,
    start,
    stop,
    pause,
    resume,
    goToStep,
    next,
    back,
    skip,
    finish,
    callback,
  };
}
