# Architecture

Kymatics is a multi-service workspace where voice and text prompts are transformed into runnable projects.

## Runtime Services

- `postgres`: persistent relational storage for Otter.
- `redis`: queue backend for Otter job lifecycle.
- `otter-server`: HTTP API and event stream layer.
- `otter-worker`: queue consumer that executes vibe jobs and setup hooks.
- `lavoix`: STT/TTS service used by Otter voice endpoints.
- `seal`: frontend for prompting, queue visibility, and job exploration.

## Core Flow

1. User submits voice/text in Seal.
2. Seal calls Otter prompt APIs.
3. Otter persists job metadata and queues execution.
4. Otter worker claims jobs and executes vibe in isolated workspace directories.
5. Worker streams output chunks and lifecycle events.
6. Seal consumes queue/history snapshots + SSE to render live Kanban state.

## Workspace Model

- Otter owns workspace creation and routing.
- Jobs are executed in project subfolders under the configured workspace root.
- Workers expose workspace tree/file/command APIs for exploration and terminal-like interactions in Seal.

## Environment Strategy

- Root `.env` in `kymatics` is the single source of truth for stack runtime.
- `scripts/up-stack.sh` bootstraps `.env` from `.env.example` and propagates compatible copies to:
  - `otter/.env`
  - `lavoix/.env`
- `docker-compose.yml` explicitly declares required variables in each service `environment` block for fail-fast behavior.
