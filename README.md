# No Shorts for YouTube

Chrome extension that removes YouTube Shorts UI on youtube.com.

## Project structure

- src/content.ts: main content script source (TypeScript)
- src/styles.css: Shorts-hiding style rules
- manifest.json: extension manifest source
- scripts/clean.mjs: removes build output
- scripts/copy-assets.mjs: copies manifest and CSS into build output
- dist/: production-ready unpacked extension (generated)

## Commands

- pnpm run build: create minified production extension files in dist/
- pnpm run watch: watch and compile TypeScript while developing
- pnpm run typecheck: run strict TypeScript checks
- pnpm run package: build and create no-shorts-extension.zip

## Load in Chrome

1. Open chrome://extensions
2. Enable Developer mode
3. Click Load unpacked
4. Select the dist/ folder

## Notes

YouTube frequently changes markup. If Shorts reappear, update selectors in src/styles.css and matching removal logic in src/content.ts.
