# Release Workflow

The release process relies on a two-tier pipeline managed locally via `./run.sh` and orchestrated by GitHub Actions.

## 1. Release Lifecycle & SemVer (`script/version.py`)

- **Candidate Phase**: Tracks development builds.
  - Bumping: `0.1.0` -> `0.1.1-rc.1` -> `0.1.1-rc.2`.
- **Promotion Phase**: Transitions to production.
  - Bumping: `0.1.1-rc.2` -> `0.1.1`.
- **Release Metadata (`release/releases.json`)**:
  - `candidate`: Tracks RC versions, commit messages, dates, and build status (`pending`/`success`/`failure`).
  - `published`: Tracks stable version, commit hashes, release dates, and status.

## 2. Operational Pipeline

- **Candidate Build**: `./run.sh build` generates a local build, verifies status, and updates `releases.json`.
- **Production Release**: `./run.sh publish` triggers:
  1.  Promotion of candidate to published.
  2.  Automated generation of `release/notes-<version>.md` (commits + file diffs).
  3.  Entry in `release/release.log`.
  4.  Git tagging (`v<version>`) and push to `main`.

## 3. CI/CD Integration (`.github/workflows/release.yml`)

- **`build-candidate` Job**: Triggered on `push`. Validates the build without deployment.
- **`publish-release` Job**: Triggered by `Publish release:` commit messages, `v*` tags, or workflow dispatch. Builds and deploys to GitHub Pages.

## 4. Command Reference

| Command | Action |
| :--- | :--- |
| `./run.sh commit rc "msg"` | Bumps RC version and records commit. |
| `./run.sh build` | Runs full candidate build and updates metadata. |
| `./run.sh publish` | Promotes, generates notes, tags, and publishes. |
| `./run.sh release` | Manual release audit/check. |

