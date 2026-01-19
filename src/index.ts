/**
 * @tour-guide/react
 * A modern, accessible, and performant React tour/onboarding library
 */

export { Tour } from "./components/Tour";
export { useTour } from "./hooks/useTour";
export type {
  TourProps,
  TourStep,
  TourStatus,
  TourCallbackProps,
  CallbackType,
  Placement,
} from "./types";
export type { UseTourOptions, UseTourReturn } from "./hooks/useTour";

// Re-export for convenience
export { Tour as default } from "./components/Tour";
