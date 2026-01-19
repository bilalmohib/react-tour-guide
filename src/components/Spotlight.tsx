import * as React from "react";

interface SpotlightProps {
  element: HTMLElement;
  zIndex: number;
  primaryColor: string;
  padding?: number;
  borderRadius?: number;
}

export function Spotlight({
  element,
  zIndex,
  primaryColor,
  padding = 8,
  borderRadius = 8,
}: SpotlightProps) {
  const [spotlightStyle, setSpotlightStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    const updateSpotlight = () => {
      const rect = element.getBoundingClientRect();

      setSpotlightStyle({
        position: "fixed",
        top: `${rect.top - padding}px`,
        left: `${rect.left - padding}px`,
        width: `${rect.width + padding * 2}px`,
        height: `${rect.height + padding * 2}px`,
        borderRadius: `${borderRadius}px`,
        border: `2px solid ${primaryColor}`,
        boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(primaryColor, 0.25)}`,
        pointerEvents: "none",
        zIndex: zIndex - 1,
        transition: "all 0.3s ease",
      });
    };

    updateSpotlight();

    const handleResize = () => updateSpotlight();
    const handleScroll = () => updateSpotlight();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [element, zIndex, primaryColor, padding, borderRadius]);

  return <div style={spotlightStyle} aria-hidden="true" />;
}

/**
 * Convert hex color to rgba string
 */
function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace("#", "");
  
  // Handle 3-digit hex colors
  const fullHex = cleanHex.length === 3
    ? cleanHex.split("").map((char) => char + char).join("")
    : cleanHex;
  
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
