---
layout: home

hero:
  name: "Kymatics"
  text: "Speak intent. Get running software."
  tagline: "A voice-driven build orchestrator: spoken prompts become queued jobs, containerised builds, and reachable preview URLs."
  actions:
    - theme: brand
      text: Get Started
      link: /tutorials/getting-started
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: Service Map
      link: /services

features:
  - title: Voice as the Primary Input
    details: Push-to-talk capture in Seal is transcribed by Lavoix and enqueued by Otter without ever leaving the board.
  - title: Durable Job Orchestration
    details: Postgres-backed lifecycle with Redis queueing gives retry, pause/resume, dependency gating, and cancellation.
  - title: Containerised by Construction
    details: Every generated project ships a Dockerfile and is verified running before a preview URL is published.
  - title: Live Execution Feedback
    details: Server-sent events stream lifecycle transitions and raw output chunks straight onto the Kanban board.
  - title: Cost and Quality Telemetry
    details: Per-job token accounting and Prometheus metrics make build success rate and spend measurable, not anecdotal.
  - title: One Stack, One Command
    details: "./kymatics.sh up brings Postgres, Redis, Lavoix, Otter, and Seal online together."
---

<figure class="kymatics-promo">
  <video
    src="/media/kymatics-promo.mp4"
    poster="/media/kymatics-promo-poster.png"
    controls
    muted
    loop
    playsinline
    preload="metadata"
  ></video>
  <figcaption>
    From a spoken prompt to a running, reachable app.
  </figcaption>
</figure>

## What This Stack Actually Does

Kymatics turns a sentence into a deployed container. The path is deliberately short:

1. You hold a key in **Seal** and describe what you want built.
2. **Lavoix** transcribes the audio and returns the text.
3. **Otter** persists the prompt as a job, ranks it in a queue, and hands it to a worker.
4. The worker runs a coding agent inside an isolated workspace, streaming every line back.
5. The agent builds the project, runs it in Docker, and registers a **preview URL**.
6. Seal shows you the running app in an embedded browser panel.

The registered preview URL is the contract. A job is not "done" because a process
exited zero — it is done because something is actually serving traffic.

## Explore

- [Concepts](/concepts) — the vocabulary: projects, workspaces, jobs, runtimes.
- [Architecture](/architecture) — service boundaries and the prompt-to-result flow.
- [Service Map](/services) — what each of the four repositories owns.
- [Getting Started](/tutorials/getting-started) — run the stack locally.
- [Observability and Evals](/observability) — metrics, cost accounting, and scoring build quality.
