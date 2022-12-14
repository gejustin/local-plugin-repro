Attempts to reproduce an NX issue where changes to a local nx plugin cause all projects in the repo to be marked as affected.

To reproduce:

1. Check out the repro branch - `git checkout -b repro-branch origin/repro-branch`
1. Query the affected projects - `npx nx print-affected --select=projects --base=origin/main`

A potential cause is the presence of a namedInput, `nxGoPlugin` which attempts to work around a [local plugin caching issue](https://nrwlcommunity.slack.com/archives/CMFKWPU6Q/p1669149526368789). Removing this named input causes only the plugin and related e2e app to be affected.

To see this in action:

1. Check out the repro branch - `git checkout -b no-named-input-repro-branch origin/no-named-input-repro-branch`
1. Query the affected projects - `npx nx print-affected --select=projects --base=origin/no-named-input`
