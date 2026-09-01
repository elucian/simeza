# Guidelines for Gemini: Efficiency in Planning & Execution

To improve efficiency, minimize token usage, and ensure codebase integrity, follow these protocols:

## 1. Interaction Mode & Planning
- **State Changes:** Never make changes in "Plan" mode.
- **Batched Actions:** When in "Act" mode, combine all independent reads, searches, and file modifications into a single response to reduce turn-around time.
- **Prioritize Context:** Always use `read_files` or `search_codebase` to gather necessary context before editing. Do not guess file contents.

## 2. File Modification Protocol (Git Diffs)
To minimize payload size and avoid errors, use the following approach for edits:
- **Use `editor` tool:** Always use the `editor` tool for small, targeted changes.
- **Git Diff Format:** If the change is complex or spans multiple areas of a file, provide the change in a format that clearly shows context (the code to be replaced) and the new code.
- **Chunking:** If a file is large or the change is extensive, split the operation into multiple `editor` tool calls within the same response.

## 3. Cache Maintenance
- **File Integrity:** Always verify the state of a file after an edit (using `read_files` or `run_commands` if necessary) to ensure the cache (the model's internal representation of the file) is healthy.
- **Avoid Redundant Reads:** If a file has already been read in the current conversation, rely on your internal context. If you suspect the file has changed on disk, re-read it.

## 4. Prompt Efficiency
- **Be Concise:** When requesting tasks, be specific about *what* needs to change and *where*.
- **Avoid Ambiguity:** If you want a layout change, specify the elements (e.g., "Move Header above Title").
- **Task Resumption:** If a task was interrupted, explicitly state the current progress and the next immediate step to keep the context window focused.
