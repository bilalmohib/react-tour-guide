/**
 * Example using useTour hook
 * More convenient way to manage tour state
 */

import * as React from "react";
import { Tour, useTour } from "../src/index";

export function HookExample() {
  const steps = [
    {
      target: "#feature-1",
      content: <div>Feature 1: This is amazing!</div>,
      placement: "bottom" as const,
    },
    {
      target: "#feature-2",
      content: <div>Feature 2: Another great feature!</div>,
      placement: "right" as const,
    },
  ];

  const tour = useTour(steps, {
    onStatusChange: (status, type) => {
      console.log(`Tour ${status}: ${type}`);
    },
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hook Example</h1>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={tour.start}>Start Tour</button>
        <button onClick={tour.pause}>Pause</button>
        <button onClick={tour.resume}>Resume</button>
        <button onClick={tour.next}>Next</button>
        <button onClick={tour.back}>Back</button>
        <button onClick={tour.skip}>Skip</button>
        <button onClick={tour.finish}>Finish</button>
      </div>

      <div id="feature-1" style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem" }}>
        Feature 1
      </div>
      <div id="feature-2" style={{ padding: "1rem", border: "1px solid #ccc" }}>
        Feature 2
      </div>

      <Tour steps={steps} run={tour.run} stepIndex={tour.stepIndex} callback={tour.callback} />
    </div>
  );
}
