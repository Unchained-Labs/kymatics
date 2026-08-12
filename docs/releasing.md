# Releasing and Submodules

## Why pins need care

The parent repository records a submodule as a **commit**, not a branch or tag.
That is what makes a Kymatics checkout reproducible: `git clone --recursive` at
any commit gives you exactly the three service versions that were tested
together.

The cost is that submodule pointers do not advance on their own. Bumping them is
an explicit, reviewable act.

## Updating a submodule pin

```bash
# 1. Move the submodule to the commit you want
cd otter
git fetch origin
git checkout v1.0.2
cd ..

# 2. Record the new gitlink in the parent repo
git add otter
git commit -m "chore: bump otter submodule to v1.0.2"
```

Then update the tag table in `SUBMODULE_VERSIONS.md` in the same commit, so the
human-readable record never drifts from the gitlink.

## Checking out the stack

```bash
git clone --recursive git@github.com:Unchained-Labs/kymatics.git
```

If you already cloned without `--recursive`:

```bash
git submodule update --init --recursive
```

To see whether your working tree has drifted from the recorded pins:

```bash
git submodule status
```

A leading `+` means the submodule is at a different commit than the parent
records — commit the gitlink or reset the submodule before pushing.

## Version numbering

Each repository carries its own `.bumpversion.cfg` and `CHANGELOG.md`, and is
released independently. The umbrella repository's `VERSION` describes the
*composition* — which set of service versions were validated together — rather
than the code in any one service.

## Release checklist

1. Each service is green on its own CI, tagged, and its changelog updated.
2. Submodule gitlinks bumped in `kymatics`, with `SUBMODULE_VERSIONS.md` updated
   in the same commit.
3. `./kymatics.sh up` succeeds from a clean checkout with only `.env.example`
   copied to `.env`.
4. `./kymatics.sh doctor` reports no missing files or unresolved compose
   variables.
5. Docs build cleanly in all four repositories.
