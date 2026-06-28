# Publishing

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

The published package must include:

- `@context-dev/convex`
- `@context-dev/convex/convex.config.js`
- `@context-dev/convex/_generated/component.js`
- `@context-dev/convex/test`
- `@context-dev/convex/openapispec.json`
