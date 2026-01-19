# Publishing Guide

## 🚀 Step-by-Step Publishing Instructions

### Prerequisites

1. **npm account** - Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **GitHub repository** (optional but recommended)
3. **Node.js >= 18** installed

### Step 1: Update Package Metadata

Before publishing, update these fields in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-tour-guide.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/react-tour-guide/issues"
  },
  "homepage": "https://github.com/yourusername/react-tour-guide#readme"
}
```

### Step 2: Install Dependencies

```bash
cd react-tour-guide
npm install
```

### Step 3: Build the Package

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions (`.d.ts` files)
- Bundle CSS files
- Create both CommonJS and ESM builds
- Output everything to `dist/` folder

**Verify the build:**
```bash
ls -la dist/
```

You should see:
- `index.js` (CommonJS)
- `index.esm.js` (ESM)
- `index.d.ts` (TypeScript types)
- `tour.css` (Styles)

### Step 4: Test Locally (Optional but Recommended)

**Option A: Using npm link**

```bash
# In react-tour-guide directory
npm link

# In your test project
cd /path/to/test-project
npm link @tour-guide/react
```

**Option B: Using local file path**

In your test project's `package.json`:
```json
{
  "dependencies": {
    "@tour-guide/react": "file:../react-tour-guide"
  }
}
```

Then:
```bash
npm install
```

### Step 5: Run Quality Checks

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Tests (if you have them)
npm test
```

### Step 6: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email address
- One-time password (if 2FA enabled)

**Verify login:**
```bash
npm whoami
```

### Step 7: Check Package Name Availability

```bash
npm view @tour-guide/react
```

If it returns an error (package not found), the name is available! ✅

If it exists, you'll need to:
- Choose a different name (update `package.json`)
- Or use a scoped name like `@yourusername/tour-guide`

### Step 8: Publish to npm

**Dry run first (recommended):**
```bash
npm publish --dry-run
```

This shows what will be published without actually publishing.

**Publish:**
```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (`@tour-guide/react`).

### Step 9: Verify Publication

1. Check npm: https://www.npmjs.com/package/@tour-guide/react
2. Test installation:
   ```bash
   npm install @tour-guide/react
   ```

### Step 10: Create GitHub Release (Optional)

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Or create release on GitHub UI with release notes
```

## 📦 Updating the Package

### For Patch/Bug Fixes (1.0.0 → 1.0.1)

```bash
npm version patch
npm publish --access public
```

### For Minor Features (1.0.0 → 1.1.0)

```bash
npm version minor
npm publish --access public
```

### For Major Changes (1.0.0 → 2.0.0)

```bash
npm version major
npm publish --access public
```

**Note:** `npm version` automatically:
- Updates `package.json` version
- Creates a git commit
- Creates a git tag

## 🔒 Publishing with 2FA

If you have 2FA enabled:

```bash
npm publish --access public --otp=123456
```

Or npm will prompt you for the OTP.

## 📋 Pre-Publish Checklist

- [ ] Updated `package.json` metadata (author, repository, etc.)
- [ ] Updated `README.md` with correct package name
- [ ] Updated `CHANGELOG.md` with version notes
- [ ] Built successfully (`npm run build`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tested locally with `npm link`
- [ ] Verified `dist/` folder contains all files
- [ ] Checked package name availability
- [ ] Logged into npm (`npm whoami`)

## 🎯 Common Issues & Solutions

### Issue: "You do not have permission to publish"
**Solution:** Make sure you're logged in and the package name isn't taken

### Issue: "Package name already exists"
**Solution:** Choose a different name or use a scoped name with your username

### Issue: "Invalid package name"
**Solution:** Package names must be lowercase, no spaces, can use hyphens

### Issue: "Missing files"
**Solution:** Check `files` field in `package.json` includes `dist`

## 🌐 Alternative: Publishing to GitHub Packages

If you prefer GitHub Packages:

1. Update `.npmrc`:
   ```
   @yourusername:registry=https://npm.pkg.github.com
   ```

2. Update `package.json`:
   ```json
   {
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

3. Publish:
   ```bash
   npm publish
   ```

## 📊 After Publishing

1. **Monitor downloads:** Check npm stats
2. **Respond to issues:** Set up GitHub Issues
3. **Update documentation:** Keep README current
4. **Version management:** Use semantic versioning

## 🔗 Useful Commands

```bash
# View package info
npm view @tour-guide/react

# View package versions
npm view @tour-guide/react versions

# Unpublish (within 72 hours only)
npm unpublish @tour-guide/react@1.0.0

# Deprecate a version
npm deprecate @tour-guide/react@1.0.0 "Use version 2.0.0 instead"
```

---

**Ready to publish?** Start with Step 1! 🚀
