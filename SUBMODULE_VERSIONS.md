# Submodule versions (pinned tags)

Kymatics uses git submodules, which are **always pinned to a specific commit** in the parent repo.

There is **no native way** for `.gitmodules` to “track a tag” the way it can track a branch for `git submodule update --remote`.
So for releases we do two things:

1) **Pin the gitlink** (the submodule commit recorded in the parent repo) to the commit behind the desired tag.
2) Record the intended **tag** for each submodule here for human clarity / release auditing.

## Current pins

- `seal`: `v1.0.0`
- `otter`: `v1.0.1`
- `lavoix`: `v1.0.0`

# Submodule versions (pinned tags)

Kymatics uses git submodules, which are **always pinned to a specific commit** in the parent repo.
To make releases explicit, we additionally record the intended **tag** for each submodule here.

## Current pins

- `seal`: `v1.0.0`
- `otter`: `v1.0.1`
- `lavoix`: `v1.0.0`

