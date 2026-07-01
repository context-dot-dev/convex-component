# Publishing

## Automated (recommended)

Pushes of version tags (`v*.*.*`) trigger the [Publish to npm](.github/workflows/publish.yml) GitHub Action. To release:

1. Bump the version in `package.json` (and commit the updated `package-lock.json` if it changed).
2. Commit and push to main:

```sh
git add package.json package-lock.json
git commit -m "Release v0.1.1"
git push origin main
```

3. Create and push a tag matching the version (with a `v` prefix):

```sh
git tag v0.1.1
git push origin v0.1.1
```

The workflow runs typecheck, tests, build, and `npm publish`. You can also trigger it manually from the GitHub Actions tab.

### One-time npm setup

Configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) for this repo:

- Package: `@context-dot-dev/convex`
- Workflow filename: `publish.yml`

## Manual publish

1. Confirm the package name and version in `package.json`.
2. Run `npm run build`.
3. Inspect the package contents:

```sh
npm pack --dry-run
```

4. Publish:

```sh
npm publish --access public
```

## Published package contents

The published package must include:

- `@context-dot-dev/convex`
- `@context-dot-dev/convex/convex.config.js`
- `@context-dot-dev/convex/_generated/component.js`
- `@context-dot-dev/convex/test`
- `@context-dot-dev/convex/openapispec.json`
