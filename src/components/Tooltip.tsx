import * as React from "react";
import type { TourStep, TooltipPosition, TourProps } from "../types";
import { cn } from "../utils/cn";

interface TooltipProps {
  step: TourStep;
  position: TooltipPosition;
  currentIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
  showProgress: boolean;
  showSkipButton: boolean;
  showBackButton: boolean;
  primaryColor: string;
  zIndex: number;
  labels: Required<NonNullable<TourProps["labels"]>>;
  className?: TourProps["className"];
}

export function Tooltip({
  step,
  position,
  currentIndex,
  totalSteps,
  isFirstStep,
  isLastStep,
  onNext,
  onBack,
  onSkip,
  onFinish,
  showProgress,
  showSkipButton,
  showBackButton,
  primaryColor,
  zIndex,
  labels,
  className,
}: TooltipProps) {
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={tooltipRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-tooltip-title"
      aria-describedby="tour-tooltip-content"
      className={cn(
        "tour-tooltip",
        "fixed bg-white rounded-lg shadow-2xl p-5 min-w-[300px] max-w-[400px]",
        className?.tooltip
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex,
      }}
    >
      {/* Progress */}
      {showProgress && totalSteps > 1 && (
        <div className="tour-progress mb-3 text-sm text-gray-500">
          Step {currentIndex + 1} of {totalSteps}
        </div>
      )}

      {/* Content */}
      <div id="tour-tooltip-content" className="tour-content mb-4">
        {step.content}
      </div>

      {/* Actions */}
      <div className="tour-actions flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {!isFirstStep && showBackButton && (
            <button
              type="button"
              onClick={onBack}
              className={cn(
                "tour-button-back",
                "px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer",
                className?.buttonSecondary
              )}
              style={{ color: primaryColor, borderColor: primaryColor }}
              aria-label="Go to previous step"
            >
              ← {labels.back}
            </button>
          )}
        </div>

        <div className="flex gap-2 ml-auto">
          {showSkipButton && (
            <button
              type="button"
              onClick={onSkip}
              className={cn(
                "tour-button-skip",
                "px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 transition-colors cursor-pointer",
                className?.button
              )}
              aria-label="Skip tour"
            >
              {labels.skip}
            </button>
          )}
          <button
            type="button"
            onClick={isLastStep ? onFinish : onNext}
            className={cn(
              "tour-button-primary",
              "px-4 py-1.5 text-sm font-medium rounded-md text-white transition-colors cursor-pointer",
              className?.buttonPrimary
            )}
            style={{
              backgroundColor: primaryColor,
            }}
            aria-label={isLastStep ? "Finish tour" : "Go to next step"}
          >
            {isLastStep ? labels.finish : labels.next}
            {!isLastStep && " →"}
          </button>
        </div>
      </div>
    </div>
  );
}
