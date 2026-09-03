# Release Workflow

The release process is automated using GitHub Actions and managed locally via `./run.sh`.

## 1. Candidate Workflow
Candidate builds run validation builds without deploying to GitHub Pages.

### Command
```bash
./run.sh commit rc "<message>"
# Bumps version (e.g., 0.1.1-rc.1 -> 0.1.1-rc.2), sets candidate commit, and logs date.

./run.sh build
# Runs the full build, generates release metadata, and updates status in `release/releases.json`.
```

### Metadata
- `release/releases.json`: Tracks published and candidate version, commit, date, and status (`success`/`failure`).
- `release/release.log`: Records all version bumps and releases.

## 2. Production Release
Production deployments trigger on `Publish release:` commit messages, `v*` tags, or workflow dispatch.

### Command
```bash
./run.sh publish
```

### Automation
`script/release.py` is invoked to:
1. Promote candidate to published.
2. Generate `release/notes-<version>.md` (contains git log and file changes).
3. Update `release/release.log`.
4. Trigger site build and update `releases.json` status to `success`.
5. Finally, `run.sh` commits, tags (`v<version>`), and pushes the release.
