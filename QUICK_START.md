# Quick Start: Publishing to npm

## 🚀 Fast Track (5 minutes)

### 1. Update Package Info
Edit `package.json` and update:
- `author`: Your name and email
- `repository.url`: Your GitHub repo URL
- `homepage`: Your GitHub repo URL

### 2. Build
```bash
npm install
npm run build
```

### 3. Login to npm
```bash
npm login
```

### 4. Check Name Availability
```bash
npm view @tour-guide/react
```
If it says "not found", the name is available! ✅

### 5. Publish
```bash
npm publish --access public
```

### 6. Verify
Visit: https://www.npmjs.com/package/@tour-guide/react

## 📝 Full Guide
See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

## 🎯 After Publishing

Users can install with:
```bash
npm install @tour-guide/react
```

And use it:
```tsx
import { Tour } from "@tour-guide/react";
import "@tour-guide/react/styles.css";
```

---

**That's it!** Your package is now live on npm! 🎉
