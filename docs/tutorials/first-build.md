# Your First Voice Build

With the stack running, this takes a spoken sentence all the way to a running
container you can open in a browser.

## Speak the prompt

Open `http://localhost:5173` and hold `Shift+Space` to record. Keep the first
one concrete and small:

> "Build a small FastAPI service with a health endpoint and one endpoint that
> returns a random quote as JSON."

Release the key. Three things happen in sequence:

1. Seal uploads the audio to `POST /v1/voice/prompts`.
2. Otter forwards it to Lavoix, which returns the transcript.
3. The transcript is shown to you and the job is enqueued.

The transcript is displayed before execution deliberately — if the
transcription is wrong, cancel and re-record rather than letting the agent build
the wrong thing.

## Watch it run

The card moves `Todo → Running`. While running you get:

- a live tail of agent output on the card,
- an elapsed-time label, and
- the full streamed log in the job modal.

That stream is `output_chunk` events over SSE, one per line of agent stdout or
stderr, persisted as they arrive.

## What the agent is required to do

Every prompt is wrapped in system requirements before reaching the agent. It
must:

- create a **project subfolder** — never write to the workspace root,
- ship a production-ready **Dockerfile** and use it as the primary run path,
- **actually start** the container and verify the port responds, and
- register the resulting URL via `POST /v1/jobs/{id}/preview-url`.

This is why a Kymatics job means more than "the model produced code". The
preview URL only exists if something is genuinely serving traffic.

## Open the result

When the job reaches `Done`, open its modal. The preview panel has two tabs:

- **Browser** — the registered preview URL, embedded.
- **Workspace Shell** — an interactive shell in the workspace container. It
  keeps its working directory across commands, so `cd` behaves as you expect.

Try it:

```bash
docker ps          # your app's container is listed
curl localhost:<port>/health
```

## Chaining work with dependencies

Once you have a service, queue the client against it. When recording a second
prompt, select the first job as a dependency. The new job stays visible in the
queue but blocked until the first reaches a terminal state.

This is the difference between a queue and a scheduler: you are declaring
ordering, not guessing at it with timing.

## When a build fails

Failed jobs keep everything — the full log, the error, and the workspace. Common
causes:

| Symptom | Likely cause |
|---|---|
| Failed with no preview URL | Agent built the app but never got the container listening |
| Port conflict inside the workspace | Another job's app already bound that port |
| Repeated attempts, same error | Prompt is ambiguous about the runtime or the port |

The workspace shell is the fastest way to diagnose: open the failed job's
terminal tab and inspect what was actually written to disk.

Retry by re-queueing the prompt with the missing detail made explicit — naming
the port and the framework usually resolves it.

## Next

- [Observability and Evals](/observability) — measure success rate and cost
  across many builds rather than judging one at a time.
- [Concepts](/concepts) — the full job lifecycle and dependency semantics.
