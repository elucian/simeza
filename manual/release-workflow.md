# Release Workflow

This project uses a local Bash command sequence and GitHub Actions. The local commands create the release commit and tag. GitHub Actions then builds the tagged commit, deploys GitHub Pages, and creates the GitHub Release.

Use Git Bash, WSL, or another Bash environment. Run the commands from the repository root.

## Release Order

For a normal release, execute these commands in order:

```bash
# Confirm the repository and LFS assets are ready
git status
git lfs pull
git lfs fsck

# Optional: load variables from .env into the current shell
source ./run.sh setup

# Develop and check the English version; repeat as needed
./run.sh build en
./run.sh dev

# Update translations after the English version is final
./run.sh translate

# Create and build a release candidate
./run.sh build

# Publish the candidate
./run.sh publish
```

The last command pushes `main` and a `v<version>` tag. That push starts the GitHub Actions `release` workflow. Wait for the `Deploy Website` workflow to finish before treating the release as published.

## Commands

### `source ./run.sh setup`

Loads variables from `.env` into the current shell. Use `source`; running `./run.sh setup` directly cannot change the parent shell. This step is optional when no local environment variables are needed.

### `./run.sh build en`

Runs a fast English-only build. It writes the result to `local/` and does not bump the version, commit files, or push anything. Use it while iterating on pages, CSS, JavaScript, or templates.

### `./run.sh dev`

Runs the English-only build and starts a local server at `http://localhost:8000/en/`. Stop the server with `Ctrl+C`. Use this to inspect the result before translating or publishing.

### `./run.sh translate`

Updates the localized Markdown cache and navigation data for changed source content. It may require the environment variables loaded by `source ./run.sh setup`. Run it after the English content is final and before the full candidate build.

### `./run.sh build`

Creates a new release candidate and performs a full build for all supported languages.

It does the following:

1. Increments the candidate version in `release/releases.json` to a new `v<x.y.z>-rc.<n>`.
2. Records a `Build candidate: ...` commit with the version change and current working-tree changes.
3. Builds all languages into `local/`.
4. Marks the candidate build as `success` or `failure` in `release/releases.json`.

This command commits locally but does not push. If the build fails, do not publish; fix the cause first.

### `./run.sh publish`

Publishes the current candidate. A candidate version must exist and differ from the published version.

The command:

1. Checks if `candidate.version` != `published.version`.
2. Promotes `candidate.version` to `published.version` in `release/releases.json` (without clearing `candidate`).
3. Generates `release/notes-<version>.md` from Git history.
4. Appends an entry to `release/release.log`.
5. Runs the full production build.
6. Creates a `Publish release: v<version>` commit.
7. Creates the `v<version>` Git tag.
8. Pushes `main` and the tag to `origin`.

The `v<version>` tag starts the `publish-release` job in `.github/workflows/release.yml`. GitHub Actions builds `local/`, deploys GitHub Pages, and creates the matching GitHub Release using the generated notes.

### `./run.sh update`

Syncs your local workspace with the remote.

1. Stashes uncommitted local changes.
2. Pulls latest from `origin/main` and updates tags.
3. Ensures Git LFS image assets are up to date.
4. Pops stashed changes.
5. Displays `Published version` and `Candidate version` to confirm synchronization status.

## Lifecycle & Version State

- **Unpublished Candidate**: When you build, `candidate.version` increments, and `candidate.version != published.version`.
- **Published/In-Sync**: When you publish, `published.version` updates to match `candidate.version`. The state `candidate.version == published.version` signifies the workspace is fully synchronized.

## GitHub Actions

- **`candidate.yml` (`Build Candidate`)**: Runs automatically on every push to the `main` branch. It validates the build of the current candidate. It ignores commits containing "Publish release:" to avoid conflicts with release deployments.
- **`release.yml` (`Deploy Website`)**: Triggers **only** when a Git tag `v*` is pushed. It builds the production bundle, deploys to GitHub Pages, and creates the GitHub Release.
- Both workflows use `lfs: true` during checkout.


If the GitHub workflow fails after the LFS conversion, confirm that both checkout steps in `.github/workflows/release.yml` contain `lfs: true`.

### There is no candidate to publish

Run the full candidate build first:

```bash
./run.sh build
./run.sh publish
```

### The local push succeeds but the website is not updated

Open the `Deploy Website` workflow in GitHub Actions. The tag-triggered job must complete successfully. A local successful build does not deploy the site by itself.

## Command Summary

| Command | Purpose | Pushes or tags? |
| :--- | :--- | :---: |
| `source ./run.sh setup` | Load `.env` into the current shell | No |
| `./run.sh build en` | Fast English build | No |
| `./run.sh dev` | English build and local server | No |
| `./run.sh translate` | Update translations and localized data | No |
| `./run.sh build` | Create candidate and full build | No |
| `./run.sh release` | Promote and build locally | No |
| `./run.sh publish` | Promote, commit, tag, and push | Yes |
