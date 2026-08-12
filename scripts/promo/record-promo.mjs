#!/usr/bin/env node
/**
 * Records the Kymatics promo video from `promo.html`.
 *
 * The output is committed to `docs/public/media/`, so this only needs to run
 * when the promo itself changes — docs builds and CI never invoke it.
 *
 * Usage:
 *   npm install
 *   npm run record
 *
 * On machines with a pre-installed Chromium (CI images, sandboxes), point at it
 * instead of downloading one:
 *   CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run record
 */

import { chromium } from 'playwright'
import { mkdir, readdir, rename, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, '../..')
const SCENE = join(HERE, 'promo.html')
const OUTPUT_DIR = join(REPO_ROOT, 'docs/public/media')
const OUTPUT_VIDEO = join(OUTPUT_DIR, 'kymatics-promo.webm')
const OUTPUT_POSTER = join(OUTPUT_DIR, 'kymatics-promo-poster.png')
const TEMP_DIR = join(HERE, '.recording')

const WIDTH = 1280
const HEIGHT = 720
// Recorded past the end of the timeline so the final scene holds before the
// video cuts, rather than ending on the transition.
const TAIL_MS = 1200
// The poster is grabbed from the title scene, once its ripple is established.
const POSTER_AT_MS = 2600

async function main() {
  if (!existsSync(SCENE)) {
    throw new Error(`scene not found: ${SCENE}`)
  }

  await rm(TEMP_DIR, { recursive: true, force: true })
  await mkdir(TEMP_DIR, { recursive: true })
  await mkdir(OUTPUT_DIR, { recursive: true })

  const launchOptions = {}
  if (process.env.CHROMIUM_PATH) {
    launchOptions.executablePath = process.env.CHROMIUM_PATH
  }

  const browser = await chromium.launch(launchOptions)
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: { dir: TEMP_DIR, size: { width: WIDTH, height: HEIGHT } },
  })

  const page = await context.newPage()
  await page.goto(pathToFileURL(SCENE).href)

  // The scene owns its own timeline; read the total back rather than keeping a
  // duplicate duration here that could drift out of sync.
  const durationMs = await page.evaluate(() => window.KYMATICS_PROMO_DURATION_MS)
  if (!durationMs) {
    throw new Error('scene did not report KYMATICS_PROMO_DURATION_MS')
  }
  console.log(`recording ${(durationMs / 1000).toFixed(1)}s at ${WIDTH}x${HEIGHT}`)

  await page.waitForTimeout(POSTER_AT_MS)
  await page.screenshot({ path: OUTPUT_POSTER })

  await page.waitForFunction(() => window.KYMATICS_PROMO_DONE === true, null, {
    timeout: durationMs + 30_000,
  })
  await page.waitForTimeout(TAIL_MS)

  // The video file is only finalised once the context closes.
  await context.close()
  await browser.close()

  const recorded = (await readdir(TEMP_DIR)).filter((name) => name.endsWith('.webm'))
  if (recorded.length !== 1) {
    throw new Error(`expected exactly one recording, found ${recorded.length}`)
  }
  await rm(OUTPUT_VIDEO, { force: true })
  await rename(join(TEMP_DIR, recorded[0]), OUTPUT_VIDEO)
  await rm(TEMP_DIR, { recursive: true, force: true })

  console.log(`video  → ${OUTPUT_VIDEO}`)
  console.log(`poster → ${OUTPUT_POSTER}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
