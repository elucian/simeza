#!/bin/bash

# Commands
# commit [rc|msg]: Commit changes locally. If 'rc', bumps version.
# translate: Run translations.
# build: Translate, commit, update releases.json, build.
# publish: Update releases.json, build, push.
# release: Check release status, promote, build.
# setup: Load environment variables from .env.
#        IMPORTANT: Must be run with 'source ./run.sh setup' to take effect.
# kill: Terminate all unused terminal sessions.
# clean: Remove local.
# serve: Serve local.
# sync: Sync gallery filter data.

CMD=$1

export EDITOR=cat VISUAL=cat

load_env() {
    if [ -f .env ]; then
        set -a
        . ./.env
        set +a
    fi
}

if [ "$CMD" == "setup" ]; then
    if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
        echo "Error: You must run 'source ./run.sh setup' to set variables."
        echo "The current command './run.sh setup' runs in a subshell and will not work."
    elif [ -f .env ]; then
        export $(grep -v "^#" .env | xargs)
        echo "Environment variables loaded."
    else
        echo "Error: .env file not found."
    fi

elif [ "$CMD" == "commit" ]; then
    echo "Committing changes..."
    if [ "$2" == "rc" ]; then
        python script/version.py rc "$3"
    fi
    git add .
    # Use $3 for rc commit, $2 for regular commit
    if [ "$2" == "rc" ]; then
        MSG="${3:-"Build candidate: $(date)"}"
    else
        MSG="${2:-"Commit: $(date)"}"
    fi
    git commit -m "$MSG"
    echo "Changes committed locally."

elif [ "$CMD" == "translate" ]; then
    load_env
    python script/translate.py 

elif [ "$CMD" == "dev" ]; then
    echo "Running fast English dev build..."
    python script/build.py --lang en
    echo "Starting local dev server at http://localhost:8000/en/..."
    python -m http.server 8000 -d local


elif [ "$CMD" == "build" ]; then
    if [ "$2" != "" ]; then
        echo "Running fast build for language: $2..."
        python script/build.py --lang "$2"
        echo "Build completed."
        exit 0
    fi

    echo "Building candidate..."
    load_env
    # 1. Bump version and commit changes
    python script/version.py rc "Build candidate: $(date)"
    git add .
    git commit -m "Build candidate: $(date)"
    
    # 2. Build
    python script/build.py
    
    # 3. Update Status
    if [ $? -eq 0 ]; then
        python -c "import json; r=json.load(open('release/releases.json')); r['candidate']['notes']='success'; json.dump(r, open('release/releases.json', 'w'), indent=2)"
    else
        python -c "import json; r=json.load(open('release/releases.json')); r['candidate']['notes']='failure'; json.dump(r, open('release/releases.json', 'w'), indent=2)"
    fi
    echo "Build completed."

elif [ "$CMD" == "publish" ]; then
    echo "Publishing..."
    # 1. Promote candidate to published and build
    # release.py internally handles: promotion, notes generation, build, status update
    python script/release.py
    
    # 2. Commit, Tag and push
    git add .
    VERSION=$(python -c "import json; print(json.load(open('release/releases.json'))['published']['version'])")
    git commit -m "Publish release: v$VERSION"
    git tag "v$VERSION"
    git push origin main --tags
    echo "Published v$VERSION."

elif [ "$CMD" == "release" ]; then
    echo "Running release check..."
    python script/release.py

elif [ "$CMD" == "clean" ]; then
    python script/clean.py

elif [ "$CMD" == "sync" ]; then
    python script/sync_gallery.py

elif [ "$CMD" == "serve" ]; then
    python -m http.server 8000 -d local

elif [ "$CMD" == "kill" ]; then
    echo "Terminating other open terminal sessions..."
    MY_TTY=$(tty 2>/dev/null | sed 's|^/dev/||')
    MY_PID=$$
    MY_PPID=$PPID

    PIDS_TO_KILL=$(ps | awk -v my_tty="$MY_TTY" -v my_pid="$MY_PID" -v my_ppid="$MY_PPID" '
    NR > 1 {
        pid = $1
        ppid = $2
        tty = $5
        # Preserve self, parent caller, and processes on the active TTY
        if (pid == my_pid || pid == my_ppid || (my_ppid != 1 && ppid == my_ppid) || (my_tty != "" && my_tty != "not a tty" && tty == my_tty)) {
            next
        }
        print pid
    }')

    if [ -n "$PIDS_TO_KILL" ]; then
        for p in $PIDS_TO_KILL; do
            echo "Killing process $p..."
            kill -9 "$p" 2>/dev/null || true
        done
        echo "Cleanup completed."
    else
        echo "No other sessions found to kill."
    fi


else
    echo "Usage: ./run.sh [setup|commit|translate|build [lang]|dev|publish|release|clean|serve|kill|sync]"


fi
