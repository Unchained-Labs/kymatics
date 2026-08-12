# Promo video

Generates the Kymatics promo video shown on the docs home page.

The rendered output is **committed** to `docs/public/media/`, so neither the
docs build nor CI needs Playwright. You only run this when the promo itself
changes.

## Files

| File | Purpose |
|---|---|
| `promo.html` | The scene. Self-contained: no network fonts or assets. |
| `record-promo.mjs` | Drives a headless browser and writes the video + poster. |

Outputs:

- `docs/public/media/kymatics-promo.webm` — 1280×720 VP8, ~40s, ~2.7 MB
- `docs/public/media/kymatics-promo-poster.png` — first-frame poster

## Regenerating

```bash
cd scripts/promo
npm install
npm run record
```

If the machine already has a Chromium build (CI images, dev sandboxes), point at
it instead of downloading another:

```bash
CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run record
```

## Editing the scene

Scenes live in the `SCENES` table at the bottom of `promo.html`:

```js
const SCENES = [
  ['s1', 5000],
  ['s2', 8000, () => typeInto(...)],
  ...
]
```

Each entry is `[element id, duration in ms, optional on-enter hook]`. The
recorder reads the total duration back from the page rather than keeping its own
copy, so changing a duration here is enough — there is no second number to keep
in sync.

Two things to preserve when editing:

- **Determinism.** The waveform heights are a fixed table, not random, so
  re-recording an unchanged scene produces an equivalent video. Avoid
  `Math.random()`.
- **Fit.** `.log` has a fixed height sized to hold every `LOG_LINES` entry. If
  you add lines, raise the height or the closing "preview-url registered" line
  gets clipped.

## Preview without recording

```bash
python3 -m http.server 8000
# open http://localhost:8000/promo.html
```

## Fonts

The scene uses Liberation Sans / Liberation Mono, which are present on the
recording images used here. It deliberately avoids web fonts so recording never
depends on network access — meaning output can differ slightly across machines
with different font sets.
