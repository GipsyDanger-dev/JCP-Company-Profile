# Delivery and Git Workflow

## Mandatory checkpoint rule

- A work batch may change **at most three files**.
- Before editing a fourth file, commit and push the completed batch to `origin`.
- Every commit message must state the user-visible result and the affected area. Avoid vague messages such as `update`, `fix`, or `wip`.
- Push each commit immediately after it is created. Do not accumulate local commits for a later push.
- Run the most relevant available verification before committing. If verification is blocked, state the exact blocker in the commit body and in the handoff.
- Keep commits small and single-purpose so the repository history remains easy to audit and roll back.
