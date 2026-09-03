#!/bin/bash

# Commands
# commit: Commit changes locally.
# translate: Run translations.
# build: Translate, commit, update releases.json, build.
# publish: Update releases.json, build, push.
# release: Check release status, promote, build.
# setup: Load environment variables from .env.
#        IMPORTANT: Must be run with 'source ./run.sh setup' to take effect.
# kill: Terminate all unused terminal sessions.
# clean: Remove public.
# serve: Serve public.

CMD=$1

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
    git add .
    MSG="${2:-"Commit: $(date)"}"
    git commit -m "$MSG"
    echo "Changes committed locally."

elif [ "$CMD" == "translate" ]; then
    python script/translate.py

elif [ "$CMD" == "build" ]; then
    echo "Building candidate..."
    # 0. Translate
    python script/translate.py
    # 1. Commit changes
    git add .
    git commit -m "Build candidate: $(date)"
    
    # 2. Update releases.json (simple python call to update)
    python -c "import json, subprocess; r=json.load(open('release/releases.json')); c=subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode().strip(); r['candidate']['commit']=c; r['candidate']['date']=subprocess.check_output(['date', '-Iseconds']).decode().strip(); json.dump(r, open('release/releases.json', 'w'), indent=2)"
    
    # 3. Build
    python script/build.py
    echo "Build completed."

elif [ "$CMD" == "publish" ]; then
    echo "Publishing..."
    # 1. Update releases.json: Promote candidate to published
    python -c "import json; r=json.load(open('release/releases.json')); r['published']=r['candidate']; r['candidate']={'version':'', 'commit':'', 'date':'', 'notes':''}; json.dump(r, open('release/releases.json', 'w'), indent=2)"
    
    # 2. Build
    python script/build.py
    
    # 3. Commit and push
    git add .
    git commit -m "Publish release: $(date)"
    git push origin main
    echo "Published."

elif [ "$CMD" == "release" ]; then
    echo "Running release check..."
    python script/release.py

elif [ "$CMD" == "clean" ]; then
    python script/clean.py

elif [ "$CMD" == "serve" ]; then
    python -m http.server 8000 -d public

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
    echo "Usage: ./run.sh [setup|commit|translate|build|publish|release|clean|serve|kill]"
fi
