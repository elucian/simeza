# Context Guidelines

To maintain operational efficiency and codebase integrity:

## 1. Context Boundaries & Token Optimization
- **Ignore**: All binary assets (`.webp`, `.jpg`, `.png`, `.pdf`, `.svg`, audio/video).
- **Whitelist**: Only process `.md`, `.json`, `.py`, `.js`, `.html`, `.css`, `.yml`, `.sh`.
- **Ephemeral**: Never load or track `local/`, `__pycache__/`, or `node_modules/` in context.

## 2. Diff-First Protocol
- **Atomic Edits**: Never overwrite entire files unless necessary.
- **Verification**: Always use `git --no-pager diff <file>` to verify and explain changes.

## 3. Terminal & Process Hygiene
- **Zero-Hang Policy**: 
  - ALWAYS use `git --no-pager` or `PAGER=cat` for all Git inspections.
  - NEVER run interactive commands (e.g., bare `git commit`, `vi`, `nano`).
- **Cleanup**: Use `./run.sh kill` to terminate hanging background sessions while preserving the active TTY.

## 4. Security & Environment
- **Secrets**: Handle `.env` variables (`GEMINI_API_KEY`) via `source ./run.sh setup`.
- **Commit Safety**: Ensure no secrets ever enter release logs, metadata, or repository history.

