# Submodule versions

Kymatics uses git submodules, which are **always pinned to a specific commit** in the parent repo.

There is **no native way** for `.gitmodules` to “track a tag” the way it can track a branch for `git submodule update --remote`.
So for releases we do two things:

1) **Pin the gitlink** (the submodule commit recorded in the parent repo) to the commit we intend to ship.
2) Record what that commit *is* here, for human clarity and release auditing.

A pin may point at a release tag or at a commit on `main` that is ahead of the
last tag. Both are legitimate; the table below says which, so the gitlink and
the human-readable record never disagree.

## Current pins

| Submodule | Commit | Relative to last tag | What it adds |
|---|---|---|---|
| `otter` | `c28d4d7` | ahead of `v1.0.1` | Token accounting, delivery metrics, `/metrics`, eval suite; Rust 1.88 and four patched advisories |
| `seal` | `2e1e13e` | ahead of `v1.0.0` | Test suite (93 tests), IPv6 preview-URL fix, tests + build in CI |
| `lavoix` | `af1c202` | ahead of `v1.0.0` | Docs build in CI |

## Updating a pin

```bash
cd otter
git fetch origin
git checkout <commit-or-tag>
cd ..
git add otter
```

Update the table above in the same commit, then verify the recorded gitlinks
match what is checked out:

```bash
git submodule status
```

A leading `+` means the submodule is at a different commit than the parent
records — commit the gitlink or reset the submodule before pushing.
