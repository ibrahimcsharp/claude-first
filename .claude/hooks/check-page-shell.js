// PostToolUse hook: after an edit to a root-level game file, tell Claude if the
// page is missing its doctype or viewport meta. Never blocks; exits 0 always.
const fs = require('fs');
const path = require('path');

let raw = '';
process.stdin.on('data', (d) => { raw += d; });
process.stdin.on('end', () => {
  let file;
  try {
    const input = JSON.parse(raw);
    file = (input.tool_response && input.tool_response.filePath) || (input.tool_input && input.tool_input.file_path);
  } catch (e) { return; }
  if (!file || path.extname(file).toLowerCase() !== '.html') return;

  const root = path.resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
  const abs = path.resolve(root, file);
  if (path.dirname(abs).toLowerCase() !== root.toLowerCase()) return;

  let html;
  try { html = fs.readFileSync(abs, 'utf8'); } catch (e) { return; }

  const missing = [];
  if (!/^\s*<!doctype html>/i.test(html)) missing.push('<!doctype html>');
  if (!/<meta[^>]+name=["']?viewport/i.test(html)) missing.push('a viewport <meta>');
  if (!missing.length) return;

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: path.basename(abs) + ' is missing ' + missing.join(' and ') +
        '. Games in this repo are full HTML documents (see CLAUDE.md); add the page shell if this change is substantial, otherwise mention it to the user.'
    }
  }));
});
