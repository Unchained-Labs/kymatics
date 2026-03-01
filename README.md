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

To change the URL of the **START NOW** button, copy `landing/.env.example` to `landing/.env` and set `VITE_START_NOW_URL` (default: `http://localhost:3000/`).

## Run with Docker

From the repo root, start all services (Postgres, Redis, Otter server + worker, Seal, Landing):

```bash
docker compose up --build
```

Root environment management:

```bash
cp .env.example .env
```

`kymatics` uses the root `.env` as the single source of truth for Docker Compose.
`./scripts/up-stack.sh` (and `./kymatics.sh up`) will also propagate this root `.env` to:

- `otter/.env`
- `lavoix/.env`

This keeps local submodule runs aligned with stack configuration.

- **Otter API**: http://localhost:8080
- **Seal (Builder Board)**: http://localhost:3000
- **Landing**: http://localhost:3001

Seal is built with `VITE_OTTER_URL=http://localhost:8080` so the browser can reach the API. Ports 3000/3001 avoid conflicts with local Vite dev servers (5173/5174).

## Development

- Use the **root** [.pre-commit-config.yaml](.pre-commit-config.yaml): run `pre-commit run --all-files` before committing.
- Prefer **granular commits**; each commit should pass pre-commit checks.

## Stack CLI

Use the root CLI to manage the full Docker stack:

```bash
./kymatics.sh up
./kymatics.sh down --volumes
./kymatics.sh restart
./kymatics.sh status
./kymatics.sh logs -f otter-server
./kymatics.sh doctor
```

You can still call scripts directly:

- `./scripts/up-stack.sh`
- `./scripts/down-stack.sh --volumes --images`
