/**
 * Custom Styled Example
 * Shows how to customize the appearance
 */

import * as React from "react";
import { useState } from "react";
import { Tour } from "../src/index";
import "./custom-styled.css";

export function CustomStyledExample() {
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: "#custom-button",
      content: (
        <div>
          <h3 style={{ marginTop: 0, color: "#fff" }}>Custom Styled Tour</h3>
          <p style={{ color: "#fff" }}>This tour uses custom colors and styling!</p>
        </div>
      ),
      placement: "bottom" as const,
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Custom Styled Example</h1>
      <button
        id="custom-button"
        onClick={() => setRun(true)}
        style={{ padding: "0.5rem 1rem" }}
      >
        Start Custom Tour
      </button>

      <Tour
        steps={steps}
        run={run}
        primaryColor="#FF6B6B"
        overlayOpacity={0.7}
        labels={{
          next: "Continue",
          back: "Previous",
          skip: "Skip Tour",
          finish: "Complete",
        }}
        className={{
          tooltip: "custom-tooltip",
          overlay: "custom-overlay",
        }}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRun(false);
          }
        }}
      />
    </div>
  );
}
