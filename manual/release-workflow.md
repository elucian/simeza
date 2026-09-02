# Release Workflow
The release process is automated using GitHub Actions.

1.  **Candidate Build**: Building candidate...
[main 69fd270] Build candidate: Wed, Sep  2, 2026 11:34:48 AM
 4 files changed, 30 insertions(+), 2 deletions(-)
 create mode 100644 .clineignore
 create mode 100644 SYSTEM_INSTRUCTIONS.md
 create mode 100644 manual/architecture.md
Build completed. generates files in  and updates  in .
2.  **Release Trigger**: Running release check...
Releasing version 0.0.1-rc.1...
Release completed successfully. (or via GitHub Actions) compares  and  versions in .
3.  **Promotion**: If versions differ,  is promoted to , and a new build is triggered.
