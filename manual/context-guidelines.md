# Context Guidelines
To maintain context efficiency, follow these rules:

1.  **Ignore Binaries**: Do not include images (.jpg, .jpeg, .png, .svg), PDFs (.pdf), audio, or video files in the context.
2.  **Text Only**: Only read and process text-based files (.md, .json, .py, .js, .html, .css, .yml, .sh).
3.  **Differential Updates**: When updating context, focus on the changes (diffs) rather than the whole codebase where possible.
4.  **Mode Switching**: Cache context for transitions between 'plan' and 'act' modes to ensure consistency.
5.  **Terminal Hygiene**: Always use non-interactive commands. Terminate any background processes and remove temporary files upon completing a task.
