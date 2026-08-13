#!/usr/bin/env node
/**
 * Renders the Kymatics promo video from `promo.html`.
 *
 * Frames are rendered deterministically rather than screen-recorded in real
 * time: the page exposes `window.PROMO.renderFrame(t)`, this script drives it
 * frame by frame and screenshots each one, then ffmpeg assembles them. That
 * gives smooth 60fps with no dropped frames, and byte-comparable output for an
 * unchanged scene — neither of which real-time capture can promise.
 *
 * The result is committed to `docs/public/media/`, so this only runs when the
 * promo itself changes; docs builds and CI never invoke it.
 *
 * Usage:
 *   npm install
 *   npm run record
 *
 * On machines with a pre-installed Chromium and ffmpeg (CI images, sandboxes):
 *   CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
 *   FFMPEG_PATH=/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux npm run record
 */

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, '../..')
const SCENE = join(HERE, 'promo.html')
const OUTPUT_DIR = join(REPO_ROOT, 'docs/public/media')
const OUTPUT_VIDEO = join(OUTPUT_DIR, 'kymatics-promo.mp4')
const OUTPUT_POSTER = join(OUTPUT_DIR, 'kymatics-promo-poster.png')
const FRAME_DIR = join(HERE, '.frames')

// The title scene's ripple is established by here, so it makes a better still
// than frame zero.
const POSTER_AT_MS = 2600

function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH
  // Playwright ships an ffmpeg build; reuse it rather than requiring a system one.
  const bundled = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux'
  if (existsSync(bundled)) return bundled
  return 'ffmpeg'
}

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolvePromise()
      else reject(new Error(`${command} exited ${code}\n${stderr.slice(-4000)}`))
    })
  })
}

async function main() {
  if (!existsSync(SCENE)) {
    throw new Error(`scene not found: ${SCENE}`)
  }

  await rm(FRAME_DIR, { recursive: true, force: true })
  await mkdir(FRAME_DIR, { recursive: true })
  await mkdir(OUTPUT_DIR, { recursive: true })

  const launchOptions = {}
  if (process.env.CHROMIUM_PATH) {
    launchOptions.executablePath = process.env.CHROMIUM_PATH
  }

  const browser = await chromium.launch(launchOptions)
  const page = await browser.newPage()
  await page.goto(pathToFileURL(SCENE).href)

  // The scene owns its own timeline and dimensions; read them back rather than
  // keeping a second copy here that could drift.
  const promo = await page.evaluate(() => ({
    totalMs: window.PROMO.totalMs,
    fps: window.PROMO.fps,
    width: window.PROMO.width,
    height: window.PROMO.height,
  }))
  if (!promo?.totalMs) {
    throw new Error('scene did not expose window.PROMO')
  }

  await page.setViewportSize({ width: promo.width, height: promo.height })

  const frameCount = Math.round((promo.totalMs / 1000) * promo.fps)
  console.log(
    `rendering ${frameCount} frames — ${(promo.totalMs / 1000).toFixed(1)}s @ ${promo.fps}fps, ` +
      `${promo.width}x${promo.height}`
  )

  const startedAt = Date.now()
  for (let frame = 0; frame < frameCount; frame++) {
    const t = (frame / promo.fps) * 1000
    await page.evaluate((ms) => window.PROMO.renderFrame(ms), t)
    const buffer = await page.screenshot({ type: 'jpeg', quality: 96 })
    await writeFile(join(FRAME_DIR, `f${String(frame).padStart(5, '0')}.jpg`), buffer)

    if (frame === Math.round((POSTER_AT_MS / 1000) * promo.fps)) {
      await page.screenshot({ path: OUTPUT_POSTER, type: 'png' })
    }
    if (frame > 0 && frame % 300 === 0) {
      const pct = ((frame / frameCount) * 100).toFixed(0)
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0)
      console.log(`  ${pct}%  (${frame}/${frameCount}, ${elapsed}s elapsed)`)
    }
  }
  await browser.close()

  const ffmpeg = resolveFfmpeg()
  console.log(`encoding with ${ffmpeg}`)
  await rm(OUTPUT_VIDEO, { force: true })
  await run(ffmpeg, [
    '-y',
    '-framerate', String(promo.fps),
    '-i', join(FRAME_DIR, 'f%05d.jpg'),
    '-c:v', 'libx264',
    '-preset', 'slow',
    // Visually lossless for flat UI colour at a sane file size.
    '-crf', '20',
    // yuv420p + even dimensions keep the file playable in every browser.
    '-pix_fmt', 'yuv420p',
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    // Put the moov atom first so the video starts before it fully downloads.
    '-movflags', '+faststart',
    OUTPUT_VIDEO,
  ])

  await rm(FRAME_DIR, { recursive: true, force: true })
  console.log(`video  → ${OUTPUT_VIDEO}`)
  console.log(`poster → ${OUTPUT_POSTER}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
