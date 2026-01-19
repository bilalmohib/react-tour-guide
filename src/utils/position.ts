import type { Placement, TooltipPosition } from "../types";

/**
 * Calculate optimal tooltip position based on target element and placement preference
 */
export function calculateTooltipPosition(
  element: HTMLElement,
  placement: Placement,
  tooltipWidth: number = 300,
  tooltipHeight: number = 200,
  spacing: number = 10,
  offset?: { top?: number; left?: number }
): TooltipPosition {
  // getBoundingClientRect returns viewport-relative coordinates (perfect for position: fixed)
  const rect = element.getBoundingClientRect();

  let finalPlacement: "top" | "bottom" | "left" | "right" = "bottom";
  let top = 0;
  let left = 0;

  if (placement === "auto") {
    // Auto-detect best placement based on available space
    const spaceTop = rect.top;
    const spaceBottom = window.innerHeight - rect.bottom;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;

    if (spaceBottom >= tooltipHeight + spacing) {
      finalPlacement = "bottom";
    } else if (spaceTop >= tooltipHeight + spacing) {
      finalPlacement = "top";
    } else if (spaceRight >= tooltipWidth + spacing) {
      finalPlacement = "right";
    } else if (spaceLeft >= tooltipWidth + spacing) {
      finalPlacement = "left";
    } else {
      finalPlacement = "bottom";
    }
  } else if (placement === "center") {
    // Center placement - position in center of viewport
    top = window.innerHeight / 2 - tooltipHeight / 2;
    left = window.innerWidth / 2 - tooltipWidth / 2;
    finalPlacement = "bottom"; // Default placement type
  } else {
    finalPlacement = placement;
  }

  if (placement !== "center") {
    switch (finalPlacement) {
      case "top":
        top = rect.top - tooltipHeight - spacing;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = rect.bottom + spacing;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - spacing;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + spacing;
        break;
    }
  }

  // Apply custom offset if provided
  if (offset) {
    top += offset.top || 0;
    left += offset.left || 0;
  }

  // Keep tooltip within viewport bounds (viewport-relative for position: fixed)
  const minLeft = 10;
  const maxLeft = window.innerWidth - tooltipWidth - 10;
  const minTop = 10;
  const maxTop = window.innerHeight - tooltipHeight - 10;

  left = Math.max(minLeft, Math.min(left, maxLeft));
  top = Math.max(minTop, Math.min(top, maxTop));

  return { top, left, placement: finalPlacement };
}

/**
 * Scroll element into view with optional padding
 */
export function scrollToElement(
  element: HTMLElement,
  padding: number = 20,
  disableScroll?: boolean
): void {
  if (disableScroll) return;

  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const elementTop = rect.top + scrollTop;
  const elementLeft = rect.left + scrollLeft;

  const targetTop = elementTop - padding;
  const targetLeft = elementLeft - padding;

  window.scrollTo({
    top: Math.max(0, targetTop),
    left: Math.max(0, targetLeft),
    behavior: "smooth",
  });
}
