// Lints the inline <script> in each game file. Dev tooling only.
const js = require('@eslint/js');
const html = require('eslint-plugin-html');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/'] },
  {
    files: ['*.html'],
    plugins: { html },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: globals.browser
    },
    rules: {
      ...js.configs.recommended.rules,
      // localStorage access is wrapped in `try { ... } catch (e) {}` by design.
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': ['error', { caughtErrors: 'none' }]
    }
  }
];
