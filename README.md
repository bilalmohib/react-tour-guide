# @tour-guide/react

> A modern, accessible, and performant React tour/onboarding library. A better alternative to react-joyride with zero legacy peer dependency issues.

[![npm version](https://img.shields.io/npm/v/@tour-guide/react.svg)](https://www.npmjs.com/package/@tour-guide/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Features

- 🚀 **Zero Legacy Dependencies** - No `--force` or `--legacy-peer-deps` needed
- 🎯 **TypeScript First** - Full TypeScript support with comprehensive types
- ♿ **Accessible** - Built with ARIA labels and keyboard navigation
- 🎨 **Highly Customizable** - Customize colors, styles, labels, and behavior
- 📱 **Responsive** - Works seamlessly on all screen sizes
- ⚡ **Performant** - Optimized with React hooks and efficient re-renders
- 🎭 **Flexible** - Support for CSS selectors or React refs
- ⌨️ **Keyboard Navigation** - Arrow keys and Escape support
- 🎪 **Auto Positioning** - Smart tooltip placement with auto-detection
- 🎬 **Smooth Animations** - Polished transitions and effects
- 🔒 **Production Ready** - Battle-tested and ready for enterprise use

## 📦 Installation

```bash
npm install @tour-guide/react
# or
yarn add @tour-guide/react
# or
pnpm add @tour-guide/react
```

## 🚀 Quick Start

```tsx
import { Tour } from "@tour-guide/react";
import "@tour-guide/react/styles"; // Optional: import default styles

function App() {
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: "#my-button",
      content: <div>This is the first step!</div>,
      placement: "bottom",
    },
    {
      target: "#my-input",
      content: <div>This is the second step!</div>,
      placement: "right",
    },
  ];

  return (
    <>
      <button onClick={() => setRun(true)}>Start Tour</button>
      <Tour
        steps={steps}
        run={run}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRun(false);
          }
        }}
      />
    </>
  );
}
```

## 📚 Documentation

### Basic Usage

```tsx
import { Tour } from "@tour-guide/react";

const steps = [
  {
    target: ".feature-1",
    content: <h3>Welcome to Feature 1</h3>,
    placement: "bottom",
  },
  {
    target: ".feature-2",
    content: <h3>This is Feature 2</h3>,
    placement: "right",
  },
];

function MyComponent() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <>
      <button onClick={() => setIsRunning(true)}>Start Tour</button>
      <Tour
        steps={steps}
        run={isRunning}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setIsRunning(false);
          }
        }}
      />
    </>
  );
}
```

### Using React Refs

```tsx
import { useRef } from "react";
import { Tour } from "@tour-guide/react";

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: buttonRef,
      content: <div>This button does something special!</div>,
    },
  ];

  return (
    <>
      <button ref={buttonRef}>Click me</button>
      <Tour steps={steps} run={run} />
    </>
  );
}
```

### Customization

```tsx
<Tour
  steps={steps}
  run={run}
  primaryColor="#FF6B6B"
  overlayOpacity={0.7}
  showProgress={true}
  showSkipButton={true}
  showBackButton={true}
  labels={{
    next: "Continue",
    back: "Previous",
    skip: "Skip Tour",
    finish: "Complete",
  }}
  className={{
    tooltip: "custom-tooltip-class",
    overlay: "custom-overlay-class",
  }}
  keyboardNavigation={true}
  disableBodyScroll={false}
/>
```

### Advanced: Step Configuration

```tsx
const steps = [
  {
    target: "#element-1",
    content: <div>Step 1</div>,
    placement: "auto", // Auto-detect best position
    disableSpotlight: false,
    disableScroll: false,
    offset: {
      top: 10,
      left: 20,
    },
  },
  {
    target: "#element-2",
    content: <div>Step 2</div>,
    placement: "center", // Center in viewport
    disableSpotlight: true, // No highlight
  },
];
```

### Callback Handling

```tsx
<Tour
  steps={steps}
  run={run}
  callback={(data) => {
    switch (data.type) {
      case "tour:start":
        console.log("Tour started");
        break;
      case "tour:end":
        console.log(`Tour ${data.status}`);
        break;
      case "step:after":
        console.log(`Moved to step ${data.index}`);
        break;
      case "target:notfound":
        console.warn(`Target not found for step ${data.index}`);
        break;
    }
  }}
/>
```

## 🎨 Styling

### Using Default Styles

```tsx
import "@tour-guide/react/styles";
```

### Custom Styling

The component uses semantic class names that you can override:

- `.tour-overlay` - Overlay backdrop
- `.tour-tooltip` - Tooltip container
- `.tour-progress` - Progress indicator
- `.tour-content` - Step content
- `.tour-actions` - Action buttons container
- `.tour-button-primary` - Primary button (Next/Finish)
- `.tour-button-back` - Back button
- `.tour-button-skip` - Skip button

```css
.tour-tooltip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.tour-button-primary {
  background: white;
  color: #667eea;
}
```

## 📖 API Reference

### `Tour` Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TourStep[]` | **required** | Array of tour steps |
| `run` | `boolean` | `false` | Whether the tour is running |
| `stepIndex` | `number` | `0` | Initial step index |
| `continuous` | `boolean` | `true` | Auto-proceed to next step |
| `showProgress` | `boolean` | `true` | Show progress indicator |
| `showSkipButton` | `boolean` | `true` | Show skip button |
| `showBackButton` | `boolean` | `true` | Show back button |
| `callback` | `(data: TourCallbackProps) => void` | - | Callback for tour events |
| `primaryColor` | `string` | `"#0F6CBD"` | Primary color for buttons/highlights |
| `zIndex` | `number` | `10000` | Z-index for overlay and tooltip |
| `overlayOpacity` | `number` | `0.5` | Overlay opacity (0-1) |
| `disableOverlayClose` | `boolean` | `false` | Disable closing on overlay click |
| `className` | `object` | - | Custom class names |
| `labels` | `object` | - | Custom button labels |
| `keyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `scrollPadding` | `number` | `20` | Scroll padding when scrolling to target |
| `disableBodyScroll` | `boolean` | `false` | Disable body scroll when tour is active |
| `spotlightPadding` | `number` | `8` | Spotlight padding around element |
| `spotlightBorderRadius` | `number` | `8` | Spotlight border radius |

### `TourStep` Interface

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `string \| RefObject<HTMLElement>` | **required** | CSS selector or React ref |
| `content` | `ReactNode` | **required** | Step content |
| `placement` | `Placement` | `"bottom"` | Tooltip placement |
| `disableSpotlight` | `boolean` | `false` | Disable spotlight for this step |
| `disableScroll` | `boolean` | `false` | Disable scrolling to target |
| `offset` | `{ top?: number; left?: number }` | - | Custom tooltip offset |
| `data` | `Record<string, string>` | - | Custom data attributes |

### `Placement` Type

```tsx
type Placement = "top" | "bottom" | "left" | "right" | "center" | "auto";
```

### `TourCallbackProps` Interface

```tsx
interface TourCallbackProps {
  status: "idle" | "running" | "paused" | "finished" | "skipped";
  type: "tour:start" | "tour:end" | "step:before" | "step:after" | "target:notfound";
  index?: number;
  step?: TourStep;
}
```

## 🎯 Comparison with react-joyride

| Feature | @tour-guide/react | react-joyride |
|---------|------------------|---------------|
| Modern Dependencies | ✅ Yes | ❌ Requires --legacy-peer-deps |
| TypeScript Support | ✅ Full | ⚠️ Partial |
| React 18+ Support | ✅ Yes | ⚠️ Issues |
| Bundle Size | ✅ Smaller | ⚠️ Larger |
| Accessibility | ✅ Built-in | ⚠️ Limited |
| Customization | ✅ Extensive | ⚠️ Moderate |
| Performance | ✅ Optimized | ⚠️ Can be slow |
| Maintenance | ✅ Active | ⚠️ Slower updates |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT © [Your Name]

## 🙏 Acknowledgments

Built with ❤️ for the React community. Inspired by the need for a modern, dependency-free tour library.
