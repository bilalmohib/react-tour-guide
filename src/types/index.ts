import * as React from "react";

/**
 * Placement options for tooltip positioning relative to target element
 */
export type Placement = "top" | "bottom" | "left" | "right" | "center" | "auto";

/**
 * Status of the tour
 */
export type TourStatus = "idle" | "running" | "paused" | "finished" | "skipped";

/**
 * Callback event types
 */
export type CallbackType =
  | "tour:start"
  | "tour:end"
  | "step:before"
  | "step:after"
  | "target:notfound";

/**
 * A single step in the tour
 */
export interface TourStep {
  /**
   * CSS selector or ref to the target element
   */
  target: string | React.RefObject<HTMLElement>;
  /**
   * Content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * Tooltip placement relative to target
   * @default "bottom"
   */
  placement?: Placement;
  /**
   * Disable the spotlight/highlight effect for this step
   * @default false
   */
  disableSpotlight?: boolean;
  /**
   * Disable scrolling to target element
   * @default false
   */
  disableScroll?: boolean;
  /**
   * Custom offset for tooltip positioning
   */
  offset?: {
    top?: number;
    left?: number;
  };
  /**
   * Custom data attributes for this step
   */
  data?: Record<string, string>;
}

/**
 * Callback function props
 */
export interface TourCallbackProps {
  /**
   * Current status of the tour
   */
  status: TourStatus;
  /**
   * Type of callback event
   */
  type: CallbackType;
  /**
   * Current step index (if applicable)
   */
  index?: number;
  /**
   * Current step data (if applicable)
   */
  step?: TourStep;
}

/**
 * Main Tour component props
 */
export interface TourProps {
  /**
   * Array of tour steps
   */
  steps: TourStep[];
  /**
   * Whether the tour is currently running
   * @default false
   */
  run?: boolean;
  /**
   * Initial step index to start from
   * @default 0
   */
  stepIndex?: number;
  /**
   * Whether to automatically proceed to next step
   * @default true
   */
  continuous?: boolean;
  /**
   * Show progress indicator (e.g., "Step 1 of 5")
   * @default true
   */
  showProgress?: boolean;
  /**
   * Show skip button
   * @default true
   */
  showSkipButton?: boolean;
  /**
   * Show back button (when not on first step)
   * @default true
   */
  showBackButton?: boolean;
  /**
   * Callback function called on tour events
   */
  callback?: (data: TourCallbackProps) => void;
  /**
   * Primary color for buttons and highlights
   * @default "#0F6CBD"
   */
  primaryColor?: string;
  /**
   * Z-index for overlay and tooltip
   * @default 10000
   */
  zIndex?: number;
  /**
   * Overlay opacity (0-1)
   * @default 0.5
   */
  overlayOpacity?: number;
  /**
   * Disable overlay click to skip
   * @default false
   */
  disableOverlayClose?: boolean;
  /**
   * Custom class names
   */
  className?: {
    overlay?: string;
    tooltip?: string;
    spotlight?: string;
    button?: string;
    buttonPrimary?: string;
    buttonSecondary?: string;
  };
  /**
   * Custom labels for buttons
   */
  labels?: {
    next?: string;
    back?: string;
    skip?: string;
    finish?: string;
  };
  /**
   * Enable keyboard navigation (arrow keys, escape)
   * @default true
   */
  keyboardNavigation?: boolean;
  /**
   * Scroll padding when scrolling to target
   * @default 20
   */
  scrollPadding?: number;
  /**
   * Disable body scroll when tour is active
   * @default false
   */
  disableBodyScroll?: boolean;
  /**
   * Spotlight border radius
   * @default 8
   */
  spotlightPadding?: number;
  /**
   * Spotlight border radius
   * @default 8
   */
  spotlightBorderRadius?: number;
}

/**
 * Internal tooltip position state
 */
export interface TooltipPosition {
  top: number;
  left: number;
  placement: "top" | "bottom" | "left" | "right";
}
