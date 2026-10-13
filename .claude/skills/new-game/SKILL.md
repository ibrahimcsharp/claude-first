---
name: new-game
description: Scaffold a new browser game in this repo as a single self-contained HTML file that follows the shared skeleton, and add its README row. Use when asked to add, create, or start a new game.
---

Create a new game: $ARGUMENTS

If no game was named, ask which game to build before writing anything.

## Steps

1. Pick the filename: `lowercase-kebab.html` in the repo root (e.g. `memory-match.html`). Stop and ask if that file already exists.
2. Read `Tic-Tac-Toe.html` and `snake.html` for the current house style before writing — use Tic-Tac-Toe as the model for DOM/SVG games and accessibility, snake as the model for canvas games, touch input and localStorage.
3. Write the game from the skeleton below, giving it its own visual identity (palette, two Google Fonts with local fallbacks, a one-line `/* Layout: ... */` comment as the first line of the CSS).
4. Add a row to the table in `README.md`: `` | `<file>.html` | <Name>: <one-line controls summary> | ``.
5. Tell the user to open the file in a browser to play. Do not commit unless asked.

## Skeleton

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Game Name</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap">
<style>
/* Layout: one sentence describing the page layout. */
:root {
  --paper: #...; --ink: #...;
  --display: "Web Font", "Local Fallback", cursive;
  --ui: "Web Font", "Segoe UI", system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #...; --ink: #...;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --paper: #...; --ink: #...;
  color-scheme: dark;
}
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--ui); }
</style>
</head>
<body>
<main class="game">
  ...
</main>
<script>
(function () {
  let s;

  function fresh() {
    return { /* all game state */ };
  }

  function render() { /* draw from s */ }

  function start(data) {
    s = Object.assign(fresh(), data || {});
    render();
  }

  const hot = window.claude && window.claude.hot;
  if (hot && hot.snapshot) hot.snapshot(() => s);
  if (hot && hot.ready) hot.ready(start); else start((hot && hot.data) || {});
})();
</script>
</body>
</html>
```

## Requirements

- One file only: inline `<style>` and `<script>`, no libraries, no images, no shared assets. Google Fonts is the only external resource and the game must still work with the fallback fonts.
- The two dark-mode blocks must contain identical values.
- Keep the `window.claude.hot` boot tail exactly as shown; snapshot only what is needed to restore a game in progress.
- All state in `s`; no globals outside the IIFE.
- Playable on touch: no hover-only controls, tap targets at least 44px, and for canvas games `touch-action: none` plus swipe or on-screen controls under `@media (hover: none), (pointer: coarse)`.
- Accessible: `type="button"` on buttons, `:focus-visible` outlines, an `aria-live="polite"` status line, labels on interactive cells, and a `prefers-reduced-motion` override for animations.
- Any localStorage key is `<game-name>-<thing>` in kebab-case, with every access in `try/catch`.
- Match the repo's JS style: 2-space indent, single quotes, semicolons, `const`/`let`, UPPER_CASE constants, `+` concatenation, `textContent`, terse with few comments.
