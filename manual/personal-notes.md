## I had some issues unversioning local

1. Add /local to .gitignore, commit
2. Remove it from version control
git rm -r --cached local 
3. Commit changes.