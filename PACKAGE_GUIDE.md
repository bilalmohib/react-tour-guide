# Package Development Guide

## Building the Package

```bash
npm install
npm run build
```

## Development

```bash
npm run dev  # Watch mode for development
```

## Testing

```bash
npm test
npm run test:coverage
```

## Publishing

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build the package: `npm run build`
4. Run type check: `npm run type-check`
5. Publish: `npm publish --access public`

## Package Structure

```
react-tour-guide/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # React hooks
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── styles/         # CSS files
│   └── index.ts        # Main entry point
├── examples/           # Example implementations
├── tests/              # Test files
├── dist/               # Built files (generated)
└── package.json
```

## Key Features Implemented

✅ Zero legacy dependencies
✅ Full TypeScript support
✅ React 18+ compatible
✅ Accessible (ARIA, keyboard navigation)
✅ Highly customizable
✅ Tree-shakeable
✅ CSS modules support
✅ Comprehensive documentation
✅ Example implementations
