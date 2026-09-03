# System Instructions for AI Agent

## Context Management
- Ignore all binary files (images, PDFs, audio, video).
- Only read/process text-based files.
- Always prefer git diffs for reporting changes.

## Workflow
- Follow the manual/ folder for architecture details.
- Adhere to manual/context-guidelines.md for context efficiency.

## Terminal & Process Hygiene
- **Non-Interactive Only**: 
  - ALWAYS use `git --no-pager` for all Git inspection commands (`log`, `diff`, `show`, `status`). 
  - Set `PAGER=cat` if necessary.
  - NEVER invoke commands that open a terminal editor (e.g., `vim`, `nano`) or pause for user input (e.g., bare `git commit`).
- **Cleanup**: Always close or kill unused terminal processes/background tasks after completing a task. Remove any created temporary log files.
