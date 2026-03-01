# Kymatics

[![CI](https://github.com/Unchained-Labs/kymatics/actions/workflows/ci.yml/badge.svg)](https://github.com/Unchained-Labs/kymatics/actions/workflows/ci.yml)

**Kymatics** is a generative engine that treats the human voice as a physical force. It uses the resonance of spoken intent to organize digital chaos into structured form, allowing creators to literally sound their ideas into reality.

Kymatics is an intelligent synthesis engine that transforms spoken intent into immediate digital structures—letting creators manifest complex interfaces at the speed of conversation, directly from a smartphone.

## Repository structure

| Directory   | Description |
|------------|-------------|
| **otter**  | Rust backend: queue and orchestration. |
| **lavoix** | Python speech service: STT/TTS (Voxtral-first) used by Otter voice endpoints. |
| **seal**   | React frontend: Builder Board UI for Otter (voice input, Kanban, job control). |
| **landing**| Marketing landing page (React + Tailwind) presenting Kymatics and its features. |

## Tech stack

- **otter**: Rust (stable).
- **lavoix**: Python 3.11+, FastAPI, provider-based STT/TTS adapters.
- **seal** / **landing**: Node.js 22+, React 18, TypeScript, Vite, Tailwind CSS.

## Prerequisites

- **Node.js** 22+
- **Rust** (stable toolchain)
- **Python** 3.x (for pre-commit)

## Quick start

```bash
# Otter (backend)
cd otter && cargo run

# Lavoix (speech service)
cd lavoix && python -m venv .venv && source .venv/bin/activate && pip install -e ".[dev]" && lavoix-server

# Seal (Builder Board)
cd seal && npm install && npm run dev

# Landing (marketing site)
cd landing && npm install && npm run dev
```

To change the URL of the **START NOW** button, copy `landing/.env.example` to `landing/.env` and set `VITE_START_NOW_URL` (default: `http://localhost:3000/`).

## Run with Docker

From the repo root, start the full orchestration stack (Postgres, Redis, Lavoix, Otter server + worker, Seal):

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
- **Lavoix API**: http://localhost:8090
- **Seal (Builder Board)**: http://localhost:5173

Seal is built with `VITE_OTTER_URL=/api` and uses the built-in proxy path for API calls.
In Docker runtime, Nginx routes `/api/*` to `otter-server`.
Otter uses a sibling-container runtime (via Docker SDK) and requires Docker socket access mounted into Otter services.

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

## Documentation

Project-level docs live in `docs/`:

- `docs/README.md` (documentation index)
- `docs/architecture.md` (system architecture and boundaries)
- `docs/operations.md` (stack operations, env model, troubleshooting)
