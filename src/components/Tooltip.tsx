import * as React from "react";
import type { TourStep, TooltipPosition, TourProps } from "../types";

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

// All styles as inline to work without Tailwind
const styles = {
  tooltip: {
    position: "fixed" as const,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    minWidth: "300px",
    maxWidth: "400px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  progress: {
    marginBottom: "12px",
    fontSize: "14px",
    color: "#6b7280",
  },
  content: {
    marginBottom: "16px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  buttonGroupRight: {
    display: "flex",
    gap: "8px",
    marginLeft: "auto",
  },
  buttonBack: {
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "6px",
    border: "1px solid",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buttonSkip: {
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "6px",
    border: "none",
    backgroundColor: "transparent",
    color: "#6b7280",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buttonPrimary: {
    padding: "6px 16px",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "6px",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

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
}: TooltipProps) {
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={tooltipRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-tooltip-title"
      aria-describedby="tour-tooltip-content"
      className="tour-tooltip"
      style={{
        ...styles.tooltip,
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex,
      }}
    >
      {/* Progress */}
      {showProgress && totalSteps > 1 && (
        <div className="tour-progress" style={styles.progress}>
          Step {currentIndex + 1} of {totalSteps}
        </div>
      )}

      {/* Content */}
      <div id="tour-tooltip-content" className="tour-content" style={styles.content}>
        {step.content}
      </div>

      {/* Actions */}
      <div className="tour-actions" style={styles.actions}>
        <div style={styles.buttonGroup}>
          {!isFirstStep && showBackButton && (
            <button
              type="button"
              onClick={onBack}
              className="tour-button-back"
              style={{
                ...styles.buttonBack,
                color: primaryColor,
                borderColor: primaryColor,
              }}
              aria-label="Go to previous step"
            >
              ← {labels.back}
            </button>
          )}
        </div>

        <div style={styles.buttonGroupRight}>
          {showSkipButton && (
            <button
              type="button"
              onClick={onSkip}
              className="tour-button-skip"
              style={styles.buttonSkip}
              aria-label="Skip tour"
            >
              {labels.skip}
            </button>
          )}
          <button
            type="button"
            onClick={isLastStep ? onFinish : onNext}
            className="tour-button-primary"
            style={{
              ...styles.buttonPrimary,
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
