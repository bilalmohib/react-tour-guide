"use client";

import * as React from "react";
import type { TourProps, TourStep, TooltipPosition } from "../types";
import { calculateTooltipPosition, scrollToElement } from "../utils/position";
import { Spotlight } from "./Spotlight";
import { Tooltip } from "./Tooltip";
import { cn } from "../utils/cn";

const DEFAULT_LABELS = {
  next: "Next",
  back: "Back",
  skip: "Skip",
  finish: "Finish",
} as const;

export function Tour({
  steps,
  run = false,
  stepIndex = 0,
  continuous: _continuous = true,
  showProgress = true,
  showSkipButton = true,
  showBackButton = true,
  callback,
  primaryColor = "#0F6CBD",
  zIndex = 10000,
  overlayOpacity = 0.5,
  disableOverlayClose = false,
  className,
  labels = {},
  keyboardNavigation = true,
  scrollPadding = 20,
  disableBodyScroll = false,
  spotlightPadding = 8,
  spotlightBorderRadius = 8,
}: TourProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(stepIndex);
  const [tooltipPosition, setTooltipPosition] = React.useState<TooltipPosition | null>(null);
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const bodyScrollLockedRef = React.useRef(false);

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  // Sync external stepIndex prop
  React.useEffect(() => {
    setCurrentStepIndex(stepIndex);
  }, [stepIndex]);

  // Handle body scroll lock
  React.useEffect(() => {
    if (!run || !disableBodyScroll) {
      if (bodyScrollLockedRef.current) {
        document.body.style.overflow = "";
        bodyScrollLockedRef.current = false;
      }
      return;
    }

    if (!bodyScrollLockedRef.current) {
      document.body.style.overflow = "hidden";
      bodyScrollLockedRef.current = true;
    }

    return () => {
      if (bodyScrollLockedRef.current) {
        document.body.style.overflow = "";
        bodyScrollLockedRef.current = false;
      }
    };
  }, [run, disableBodyScroll]);

  // Find and position target element
  React.useEffect(() => {
    if (!run || steps.length === 0) {
      setTooltipPosition(null);
      setTargetElement(null);
      return;
    }

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    let element: HTMLElement | null = null;

    // Handle both string selector and ref
    if (typeof currentStep.target === "string") {
      element = document.querySelector(currentStep.target) as HTMLElement;
    } else if (currentStep.target?.current) {
      element = currentStep.target.current;
    }

    if (!element) {
      // Element not found - skip to next or finish
      callback?.({
        status: "running",
        type: "target:notfound",
        index: currentStepIndex,
        step: currentStep,
      });

      if (currentStepIndex < steps.length - 1) {
        handleNext();
      } else {
        handleFinish();
      }
      return;
    }

    setTargetElement(element);

    // Scroll to element if not disabled
    if (!currentStep.disableScroll) {
      scrollToElement(element, scrollPadding, currentStep.disableScroll);
    }

    // Update tooltip position after a brief delay to allow for scroll
    const timeoutId = setTimeout(() => {
      updateTooltipPosition(element!, currentStep.placement || "bottom", currentStep.offset);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [run, currentStepIndex, steps, scrollPadding]);

  const updateTooltipPosition = (
    element: HTMLElement,
    placement: TourStep["placement"],
    offset?: TourStep["offset"]
  ) => {
    const tooltipWidth = tooltipRef.current?.offsetWidth || 300;
    const tooltipHeight = tooltipRef.current?.offsetHeight || 200;
    const position = calculateTooltipPosition(
      element,
      placement || "bottom",
      tooltipWidth,
      tooltipHeight,
      10,
      offset
    );
    setTooltipPosition(position);
  };

  // Handle resize and scroll events
  React.useEffect(() => {
    if (!run || !targetElement) return;

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    const handleResize = () => {
      updateTooltipPosition(targetElement, currentStep.placement || "bottom", currentStep.offset);
    };

    const handleScroll = () => {
      updateTooltipPosition(targetElement, currentStep.placement || "bottom", currentStep.offset);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [run, targetElement, currentStepIndex, steps]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!run || !keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if (e.key === "ArrowRight" && currentStepIndex < steps.length - 1) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentStepIndex > 0) {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [run, keyboardNavigation, currentStepIndex, steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      callback?.({
        status: "running",
        type: "step:after",
        index: newIndex,
        step: steps[newIndex],
      });
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      callback?.({
        status: "running",
        type: "step:after",
        index: newIndex,
        step: steps[newIndex],
      });
    }
  };

  const handleSkip = () => {
    callback?.({
      status: "skipped",
      type: "tour:end",
      index: currentStepIndex,
      step: steps[currentStepIndex],
    });
    resetTour();
  };

  const handleFinish = () => {
    callback?.({
      status: "finished",
      type: "tour:end",
      index: currentStepIndex,
      step: steps[currentStepIndex],
    });
    resetTour();
  };

  const resetTour = () => {
    setCurrentStepIndex(0);
    setTooltipPosition(null);
    setTargetElement(null);
  };

  const handleOverlayClick = () => {
    if (!disableOverlayClose) {
      handleSkip();
    }
  };

  // Emit tour start callback
  React.useEffect(() => {
    if (run && steps.length > 0) {
      callback?.({
        status: "running",
        type: "tour:start",
        index: currentStepIndex,
        step: steps[currentStepIndex],
      });
    }
  }, [run]);

  if (!run || steps.length === 0 || currentStepIndex >= steps.length) {
    return null;
  }

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        role="presentation"
        className={cn(
          "tour-overlay",
          "fixed inset-0 transition-opacity",
          className?.overlay
        )}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: zIndex - 1,
        }}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Spotlight */}
      {targetElement && !currentStep.disableSpotlight && (
        <Spotlight
          element={targetElement}
          zIndex={zIndex}
          primaryColor={primaryColor}
          padding={spotlightPadding}
          borderRadius={spotlightBorderRadius}
        />
      )}

      {/* Tooltip */}
      {tooltipPosition && (
        <Tooltip
          step={currentStep}
          position={tooltipPosition}
          currentIndex={currentStepIndex}
          totalSteps={steps.length}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          onFinish={handleFinish}
          showProgress={showProgress}
          showSkipButton={showSkipButton}
          showBackButton={showBackButton}
          primaryColor={primaryColor}
          zIndex={zIndex}
          labels={mergedLabels}
          className={className}
        />
      )}
    </>
  );
}
