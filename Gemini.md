# Guidelines for Gemini: Efficiency in Planning & Execution

To improve efficiency, minimize token usage, and ensure codebase integrity, follow these protocols:

## 1. Zero-Hang & Non-Interactive Policy (CRITICAL)
- **Git Paging Ban**: Git pagers (like `less` or `more`) cause terminal hangs. **ALL** Git inspection commands MUST be non-interactive.
- **Mandatory Flags**: Always use `git --no-pager` or `GIT_PAGER=cat` for all Git commands that produce output.
- **Interactive Editor Ban**: Never invoke commands that open a terminal editor or require user input (e.g., bare `git commit`, `git rebase -i`, `vi`, `nano`). Always use provided tools (like `editor` or `run_commands` with `-m` flags).

| ❌ Dangerous (Causes Terminal Hang / Prompts for `q`) | ✅ Safe Non-Interactive Replacement |
| :--- | :--- |
| `git log -p -n 3` | `git --no-pager log -p -n 3` |
| `git diff <file>` | `git --no-pager diff <file>` |
| `git show HEAD` | `git --no-pager show HEAD` |
| `git diff --stat` | `git --no-pager diff --stat` |
| `git commit` | `git commit -m "Commit message"` |
| `less <file>` / `more <file>` | `read_files` tool or `cat <file>` |

## 2. Git Diff-First Protocol
- **Atomic Edits**: Avoid overwriting entire files unless absolutely necessary. Use targeted replacements (Git diff style) to minimize token usage and prevent accidental data loss.
- **Verification**: After every edit, verify the state of the file using `git --no-pager diff <file>` to confirm the change matches the user's intent.
- **Safe Overwrites**: Never use shell redirection (`>`) to overwrite files. Use the `editor` tool for precise edits.

## 3. Layout & Architectural Standards
- **Single Source of Truth**: All CSS styles must be in `core/css/style.css`. Zero inline CSS allowed.
- **Container Strategy**: Every page must use a single `<main class="container main p-0">` wrapper.
- **Containment**: Use a 1000px max-width constraint with `margin: 24px auto` for desktop/laptop, and 100% width for mobile.
- **Grid Centering**: Headers must use `grid-template-columns: 1fr auto 1fr` for mathematical title centering.
- **Dynamic Injection**: `core/js/layout.js` must inject header/nav/footer inside the `.main` container, not globally on the `body`.

## 4. Communication Standards
- **Git Diffs**: When explaining changes, provide the relevant `git --no-pager diff` or the affected code block.
- **Atomic Tasks**: If a task is complex, break it into smaller, commit-ready steps.
- **Validation**: Always end a turn by confirming the state with `git status` or a relevant `git --no-pager diff --stat`.

## 5. Onboarding & Cache
- **Project Structure**:
  - `core/`: CSS, JS, Assets, and Menu JSONs.
  - `ro/`: Localized HTML templates.
  - `index.html`: The root entry point, aligned with the `ro/` template architecture.
- **Task Focus**: Context is persistent. If a task fails, analyze the diff of the failure before attempting a retry.

## 6. Environment & Process Hygiene
- **Cleanup**: Before finishing any turn, ensure no processes are running in the background. Kill unused terminals.
- **Temporary Files**: Delete any temporary files or logs generated during tool execution.
- **Command Safety**: Do not run interactive commands that wait for user input without explicit non-interactive flags. If a tool hangs, it is likely waiting for input, which must be avoided entirely.
