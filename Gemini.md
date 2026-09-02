# Guidelines for Gemini: Efficiency in Planning & Execution

To improve efficiency, minimize token usage, and ensure codebase integrity, follow these protocols:

## 1. Git Diff-First Protocol
- **Atomic Edits**: Avoid overwriting entire files unless absolutely necessary. Use targeted replacements (Git diff style) to minimize token usage and prevent accidental data loss.
- **Verification**: After every edit, verify the state of the file using `git diff <file>` to confirm the change matches the user's intent.
- **Safe Overwrites**: Never use shell redirection (`>`) to overwrite files. Use the `editor` tool for precise edits.

## 2. Layout & Architectural Standards
- **Single Source of Truth**: All CSS styles must be in `core/css/style.css`. Zero inline CSS allowed.
- **Container Strategy**: Every page must use a single `<main class="container main p-0">` wrapper.
- **Containment**: Use a 1000px max-width constraint with `margin: 24px auto` for desktop/laptop, and 100% width for mobile.
- **Grid Centering**: Headers must use `grid-template-columns: 1fr auto 1fr` for mathematical title centering.
- **Dynamic Injection**: `core/js/layout.js` must inject header/nav/footer inside the `.main` container, not globally on the `body`.

## 3. Communication Standards
- **Git Diffs**: When explaining changes, provide the relevant `git diff` or the affected code block.
- **Atomic Tasks**: If a task is complex, break it into smaller, commit-ready steps.
- **Validation**: Always end a turn by confirming the state with `git status` or a relevant `git diff --stat`.

## 4. Onboarding & Cache
- **Project Structure**:
  - `core/`: CSS, JS, Assets, and Menu JSONs.
  - `ro/`: Localized HTML templates.
  - `index.html`: The root entry point, aligned with the `ro/` template architecture.
- **Task Focus**: Context is persistent. If a task fails, analyze the diff of the failure before attempting a retry.
