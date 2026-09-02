# System Instructions for AI Agent

## Context Management
- Ignore all binary files (images, PDFs, audio, video).
- Only read/process text-based files.
- Always prefer git diffs for reporting changes.

## Workflow
- Follow the manual/ folder for architecture details.
- Adhere to manual/context-guidelines.md for context efficiency.

## Terminal & Process Hygiene
- **Non-Interactive Only**: Always use `--no-pager` for git commands. Set `PAGER=cat` if necessary.
- **Cleanup**: Always close or kill unused terminal processes/background tasks after completing a task. Remove any created temporary log files.
