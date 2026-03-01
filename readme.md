# Kymatics

**Kymatics** is a generative engine that treats the human voice as a physical force. It uses the resonance of spoken intent to organize digital chaos into structured form, allowing creators to literally sound their ideas into reality.

Kymatics is an intelligent synthesis engine that transforms spoken intent into immediate digital structures—letting creators manifest complex interfaces at the speed of conversation, directly from a smartphone.

## Repository structure

| Directory   | Description |
|------------|-------------|
| **otter**  | Rust backend: queue and orchestration. |
| **seal**   | React frontend: Builder Board UI for Otter (voice input, Kanban, job control). |
| **landing**| Marketing landing page (React + Tailwind) presenting Kymatics and its features. |

## Tech stack

- **otter**: Rust (stable).
- **seal** / **landing**: Node.js 22+, React 18, TypeScript, Vite, Tailwind CSS.

## Prerequisites

- **Node.js** 22+
- **Rust** (stable toolchain)
- **Python** 3.x (for pre-commit)

## Quick start

```bash
# Otter (backend)
cd otter && cargo run

# Seal (Builder Board)
cd seal && npm install && npm run dev

# Landing (marketing site)
cd landing && npm install && npm run dev
```

## Run with Docker

From the repo root, start all services (Postgres, Redis, Otter server + worker, Seal, Landing):

```bash
docker compose up --build
```

- **Otter API**: http://localhost:8080
- **Seal (Builder Board)**: http://localhost:3000
- **Landing**: http://localhost:3001

Seal is built with `VITE_OTTER_URL=http://localhost:8080` so the browser can reach the API. Ports 3000/3001 avoid conflicts with local Vite dev servers (5173/5174).

## Deploy landing on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub).
2. **Add New Project** → **Import** your `kymatics` repository.
3. **Configure:**
   - **Root Directory:** click **Edit**, set to `landing`, then **Continue**.
   - **Framework Preset:** Vite (auto-detected).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `dist` (default).
   - **Install Command:** `npm ci` (default).
4. **Deploy.** Vercel will build and host the landing site. Later pushes to `main` (or your production branch) will trigger automatic deployments.

The [landing/vercel.json](landing/vercel.json) in this repo sets the build output and SPA routing so client-side routes work.

## Development

- Use the **root** [.pre-commit-config.yaml](.pre-commit-config.yaml): run `pre-commit run --all-files` before committing.
- Prefer **granular commits**; each commit should pass pre-commit checks.
