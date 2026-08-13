# Concepts

The stack has a small vocabulary. Everything else is built from these five nouns.

## Project

A named container for related work. Projects exist to group workspaces and give
history a stable label. They hold no execution state of their own.

## Workspace

A workspace is the unit of **isolation**. It owns:

- a `root_path` on disk where generated code lives, and
- an `isolated_vibe_home` — a private agent home directory.

The separate agent home is the trust boundary. Two workspaces running
concurrently cannot read each other's agent credentials, caches, or session
state, because they never share a home directory. See
[the workspace trust model](https://github.com/Unchained-Labs/otter/blob/main/docs/workspace-trust-model.md)
for the full rationale.

Generated projects are always written to a **subfolder** of the workspace root,
never the root itself. This keeps one workspace reusable across many jobs
without the outputs colliding.

## Job

A job is one prompt and everything that happened to it. It carries:

| Field | Meaning |
|---|---|
| `prompt` | What the user asked for, verbatim |
| `status` | `queued`, `running`, `succeeded`, `failed`, `cancelled` |
| `priority` / `queue_rank` | Position in the queue; drag-and-drop in Seal writes this |
| `is_paused` | Held in the queue without losing its place |
| `attempts` / `max_attempts` | Retry accounting |
| `preview_url` | Where the finished app is actually reachable |
| `error` | Failure detail when status is `failed` |

### Dependency gating

A job may declare `dependency_job_ids`. It stays blocked — visible in the queue
but not claimable — until every dependency reaches a terminal state. This is how
you express "build the API first, then the client that calls it" in a single
batch of prompts.

### Pause versus cancel

Pausing keeps the job queued and keeps its rank. Cancelling is terminal and kills
the running process. Pause is for "not right now"; cancel is for "never mind".

## Runtime

The runtime is the sibling-container layer. When enabled, Otter talks to the
host Docker socket to start, stop, restart, and inspect the containers that
generated projects run in.

Two registries are tracked:

- **Workspace runtimes** — the long-lived container backing a workspace shell.
- **Job runtime apps** — the app a specific job started, with its launch and
  stop commands so the UI can restart it later.

::: warning Host privilege
Mounting the Docker socket grants the Otter services broad host privilege. Run
this configuration on trusted machines only. See the security note in
[Operations](/operations#security-note-sibling-containers).
:::

## Event

Every meaningful transition is written to `job_events` and simultaneously
broadcast over SSE at `/v1/events/stream`. Two kinds matter:

- **Lifecycle events** — `job_queued`, `job_started`, `job_succeeded`, and so on.
- **`output_chunk`** — a single line of agent stdout/stderr, streamed live.

Because lifecycle events are persisted, a client that reconnects can rebuild
state from history rather than depending on having been connected at the time.
