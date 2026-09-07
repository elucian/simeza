import re

with open('run.sh', 'r') as f:
    content = f.read()

new_block = """
elif [ "" == "update" ]; then
    echo "Preparing workspace for new session..."
    if ! git diff-index --quiet HEAD --; then
        echo "Warning: You have uncommitted changes."
        git status --short
        read -p "Continue updating anyway? (y/N): " choice
        [[ "" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
    fi
    echo "Pulling latest changes from origin/main..."
    git pull origin main
    echo "Resyncing tags..."
    git fetch --tags -f origin
    if command -v git-lfs >/dev/null 2>&1 || git lfs version >/dev/null 2>&1; then
        echo "Ensuring Git LFS image assets are up to date..."
        git lfs pull
    fi
    VERSION=$(python -c "import json; print(json.load(open('release/releases.json'))['published']['version'])" 2>/dev/null || echo "unknown")
    echo "----------------------------------------"
    echo "Workspace is synchronized and ready!"
    echo "Current published version: v$VERSION"
    echo "Head commit: $(git log -1 --oneline)"
    echo "----------------------------------------"

# kill:"""

content = content.replace('# kill:', new_block)

with open('run.sh', 'w') as f:
    f.write(content)
