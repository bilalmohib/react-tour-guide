/**
 * Basic Example
 * Simple tour implementation
 */

import * as React from "react";
import { useState } from "react";
import { Tour } from "../src/index";

export function BasicExample() {
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: "#button-1",
      content: (
        <div>
          <h3 style={{ marginTop: 0 }}>Welcome!</h3>
          <p>This is the first step of the tour.</p>
        </div>
      ),
      placement: "bottom" as const,
    },
    {
      target: "#input-1",
      content: (
        <div>
          <h3 style={{ marginTop: 0 }}>Input Field</h3>
          <p>This is an input field you can interact with.</p>
        </div>
      ),
      placement: "right" as const,
    },
    {
      target: "#card-1",
      content: (
        <div>
          <h3 style={{ marginTop: 0 }}>Card Component</h3>
          <p>This is a card component with some content.</p>
        </div>
      ),
      placement: "top" as const,
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Basic Tour Example</h1>
      <button
        id="button-1"
        onClick={() => setRun(true)}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        Start Tour
      </button>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="input-1">Input:</label>
        <input id="input-1" type="text" style={{ marginLeft: "0.5rem", padding: "0.5rem" }} />
      </div>

      <div
        id="card-1"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          maxWidth: "400px",
        }}
      >
        <h3>Card Title</h3>
        <p>This is some card content that will be highlighted during the tour.</p>
      </div>

      <Tour
        steps={steps}
        run={run}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRun(false);
          }
        }}
      />
    </div>
  );
}
