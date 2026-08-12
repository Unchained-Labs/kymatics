# Service Map

Kymatics is an umbrella repository. The three runtime services are git
submodules, each independently versioned, tested, and documented.

| Repository | Language | Role | Docs |
|---|---|---|---|
| [otter](https://github.com/Unchained-Labs/otter) | Rust | Orchestration control plane: queue, jobs, workspaces, runtime | `otter/docs/` |
| [seal](https://github.com/Unchained-Labs/seal) | TypeScript / React | Operator UI: voice capture, Kanban board, previews | `seal/docs/` |
| [lavoix](https://github.com/Unchained-Labs/lavoix) | Python | Speech services: STT and TTS behind a provider abstraction | `lavoix/docs/` |
| `landing/` | TypeScript / React | Marketing site (in-tree, not a submodule) | — |

## Otter

The only service that owns durable state. It exposes the HTTP API that Seal
talks to, writes job lifecycle to Postgres, ranks work in Redis, and runs the
worker that executes coding-agent jobs.

Split into three crates:

- `otter-core` — domain types, persistence, agent execution, runtime management.
- `otter-server` — the HTTP and SSE surface.
- `otter-worker` — the queue consumer.

If you are changing behaviour, it almost always belongs in `otter-core`.

## Seal

A Vite + React single-page app. It is deliberately stateless: everything it
renders comes from polling `GET /v1/queue` and `GET /v1/history`, hydrating
individual jobs, and subscribing to `GET /v1/events/stream`.

Seal talks to Otter through a same-origin `/api` path — Vite proxies it in dev,
Nginx proxies it in Docker. This avoids CORS and host-mismatch problems between
the browser, containers, and local CLI usage.

## Lavoix

A FastAPI service plus a Python client library. Speech-to-text is Voxtral-first
through the Mistral API, with an optional local `faster-whisper` fallback.
Text-to-speech follows the same provider pattern with an OSS fallback so the
service still functions without an API key.

Lavoix is usable standalone. Otter is just one consumer of it.

## Version pinning

Submodules are pinned by commit (gitlink) in this repository. The intended
release tags are tracked separately in
[`SUBMODULE_VERSIONS.md`](https://github.com/Unchained-Labs/kymatics/blob/main/SUBMODULE_VERSIONS.md),
because `.gitmodules` cannot track a tag natively.

See [Releasing and Submodules](/releasing) for the update procedure.
