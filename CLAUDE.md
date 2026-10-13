# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Small browser games, one self-contained HTML file per game in the repo root. Plain HTML, CSS and vanilla JS — no build step and no tests. To run a game, open its file in a browser.

`package.json` exists only for ESLint, which lints the inline `<script>` of each game. Run `npm run lint` after changing game JS. Never add runtime dependencies or make a game need `npm install` to play.

## Rules for game files

- Keep each game in a single file: one inline `<style>`, one inline `<script>`. No shared CSS/JS, no libraries, no images. Google Fonts via `<link>` is the only external resource, and every font variable needs a local fallback stack.
- Every game is a full HTML document: doctype, `<html>`, `<head>` with charset and viewport meta, `<body>`. `snake.html` is still a bare fragment — give it the full shell when you next make a substantial change to it.
- Name new files `lowercase-kebab.html`. Don't rename `Tic-Tac-Toe.html` unless asked.
- Add a row to the table in `README.md` for every new game.
- Keep the `window.claude.hot` boot tail at the end of each script and replicate it in new games. It is a feature-detected host hook (state snapshot/restore), not dead code.
- Game state lives in one object `s` created by `fresh()`; `start(data)` boots the game and can restore from a snapshot. The whole script is one IIFE with no globals.

## Gotchas

- The dark palette is declared twice per file: inside `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and again in `:root[data-theme="dark"]`. Change both.
- `snake.html` draws on canvas using colours read from CSS variables by name (`readTheme` / the `colors` object). Renaming those variables in CSS breaks rendering silently.
- localStorage keys are kebab-case with the game name as prefix (`pocket-snake-best`), and every access is wrapped in `try/catch`.

## Style

2-space indent, single quotes in JS, semicolons, `const`/`let`, UPPER_CASE constants, string concatenation with `+`, `textContent` for DOM text, `type="button"` on every button. The code is terse with very few comments — match it.

## Git

Commit directly to `main`; no branches or pull requests. Commit messages follow `Add <Game> game` / short imperative subject.
