# Promo video

Generates the Kymatics promo video shown on the docs home page.

The rendered output is **committed** to `docs/public/media/`, so neither the
docs build nor CI needs Playwright or ffmpeg. You only run this when the promo
itself changes.

| File | Purpose |
|---|---|
| `promo.html` | The scene. Self-contained: no network fonts or assets. |
| `record-promo.mjs` | Renders each frame, then encodes them with ffmpeg. |

Outputs:

- `docs/public/media/kymatics-promo.mp4` — 1920×1080, 60 fps, ~53 s, H.264
- `docs/public/media/kymatics-promo-poster.png` — poster frame

## Why frames instead of screen recording

The scene is rendered **deterministically**, one frame at a time, rather than
captured in real time. The page exposes `window.PROMO.renderFrame(t)`; the
recorder steps `t` forward by exactly `1/fps`, screenshots, and hands the
sequence to ffmpeg.

Real-time capture ties video quality to how fast the recording machine happens
to be, and drops frames under load. Rendering frame by frame means:

- **Smooth** — a true 60 fps with no dropped or duplicated frames.
- **Reproducible** — the same scene produces an equivalent video every run,
  on any machine, at any speed.
- **Higher quality** — 1080p at whatever encode settings you want, decoupled
  from capture performance.

The cost is wall-clock: ~3200 frames takes a few minutes to render.

## Regenerating

Needs a **system ffmpeg built with libx264**:

```bash
apt-get install ffmpeg     # or: brew install ffmpeg
```

::: warning The Playwright-bundled ffmpeg will not work
Playwright ships an ffmpeg, but it is built with `--disable-everything` and
enables only VP8/WebM — no libx264, no mp4 muxer. The recorder checks for
libx264 up front and fails immediately rather than after rendering every frame.
:::

```bash
cd scripts/promo
npm install
npm run record
```

If the machine already has a Chromium build, point at it instead of downloading
another:

```bash
CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run record
```

Set `FFMPEG_PATH` if your ffmpeg is not on `PATH`.

## Editing the scene

The timeline is the `SCENES` table near the bottom of `promo.html`:

```js
const SCENES = [
  { dur: 5200, render: renderTitle },
  { dur: 8200, render: renderVoice },
  ...
]
```

Each entry is `{ duration in ms, render function }`. Every render function
receives `(p, ms)` — progress through its own scene, and local elapsed
milliseconds — and sets **every** property it controls from those two numbers.
Cross-fades between scenes are handled centrally.

The recorder reads the total duration and the frame rate back from the page, so
changing a scene length here is the only edit needed — there is no second number
to keep in sync.

Two rules to preserve when editing:

- **No self-driven animation.** CSS transitions and keyframes are disabled
  globally (`animation: none !important`). If a property changes over time, it
  must be computed from `ms` in a render function, or it will not appear.
- **No randomness.** `Math.random()` and wall-clock time would make the output
  differ between runs. The waveform and sparkline use layered sines seeded by
  element index instead.

## Preview without rendering

```bash
python3 -m http.server 8000
# then, in the browser console:
#   PROMO.renderFrame(23000)   // jump to 23s
```

## Fonts

The scene uses Liberation Sans / Liberation Mono and deliberately avoids web
fonts so rendering never depends on network access. Output can therefore differ
slightly across machines with different font sets.
