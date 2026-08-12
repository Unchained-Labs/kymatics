# Related Documents

Kymatics documentation is split deliberately: this site covers the **stack**,
and each service repository documents **itself**.

## This repository

- [Concepts](/concepts) — projects, workspaces, jobs, runtimes, events.
- [Architecture](/architecture) — service boundaries and data flow.
- [Service Map](/services) — what each repository owns.
- [Running the Stack](/operations) — day-2 operations and troubleshooting.
- [Observability and Evals](/observability) — metrics, cost, and build quality.
- [Releasing and Submodules](/releasing) — pinning and release procedure.

## Otter (orchestration)

- [Architecture](https://github.com/Unchained-Labs/otter/blob/main/docs/architecture.md)
- [Prompt-to-Result Flow](https://github.com/Unchained-Labs/otter/blob/main/docs/prompt-to-result-flow.md)
- [REST API](https://github.com/Unchained-Labs/otter/blob/main/docs/api.md)
- [Workspace Trust Model](https://github.com/Unchained-Labs/otter/blob/main/docs/workspace-trust-model.md)
- [Runbook](https://github.com/Unchained-Labs/otter/blob/main/docs/runbook.md)
- [NUC Operations](https://github.com/Unchained-Labs/otter/blob/main/docs/operations-nuc.md)

## Seal (operator UI)

- [Architecture](https://github.com/Unchained-Labs/seal/blob/main/docs/architecture.md)
- [Backend Endpoint Usage](https://github.com/Unchained-Labs/seal/blob/main/docs/api/backend-endpoints.md)
- [Event Stream Contract](https://github.com/Unchained-Labs/seal/blob/main/docs/api/event-stream-contract.md)
- [Operating the Board](https://github.com/Unchained-Labs/seal/blob/main/docs/tutorials/operating-the-board.md)

## Lavoix (speech)

- [Architecture](https://github.com/Unchained-Labs/lavoix/blob/main/docs/architecture.md)
- [REST API](https://github.com/Unchained-Labs/lavoix/blob/main/docs/api/rest-api.md)
- [Library API](https://github.com/Unchained-Labs/lavoix/blob/main/docs/api/library-api.md)
- [Building a Provider](https://github.com/Unchained-Labs/lavoix/blob/main/docs/tutorials/building-a-provider.md)

## Where to file changes

| Topic | Repository |
|---|---|
| Queue semantics, job lifecycle, runtime containers | `otter` |
| Board UX, previews, event consumption | `seal` |
| Transcription, synthesis, provider adapters | `lavoix` |
| Compose stack, env model, cross-service docs | `kymatics` |
