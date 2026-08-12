# Getting Started

This walks through bringing the full stack up on one machine and confirming
every service is healthy.

## Prerequisites

- **Docker Engine** with the Compose plugin
- **Git** with submodule support
- A **Mistral API key** — the coding agent and the Voxtral speech path both need it
- Host access to `/var/run/docker.sock` if you want the sibling-container runtime

Optional, for local development outside Docker:

- Node.js 22+ (Seal, landing, docs)
- Rust stable (Otter)
- Python 3.11+ (Lavoix, pre-commit)

## 1. Clone with submodules

```bash
git clone --recursive git@github.com:Unchained-Labs/kymatics.git
cd kymatics
```

Already cloned without `--recursive`? Run:

```bash
git submodule update --init --recursive
```

## 2. Configure the environment

The root `.env` is the single source of truth. `up-stack.sh` copies it into
`otter/.env` and `lavoix/.env` on every start, so you never edit those directly.

```bash
cp .env.example .env
```

Then set your key:

```bash
MISTRAL_API_KEY=sk-...
```

Everything else in `.env.example` has a working default. The values you are most
likely to change are the host ports if something already occupies them:

| Variable | Default | Service |
|---|---|---|
| `POSTGRES_PORT` | `5432` | Postgres |
| `REDIS_PORT` | `6379` | Redis |
| `OTTER_PORT` | `8080` | Otter API |
| `LAVOIX_PORT` | `8090` | Lavoix API |
| `SEAL_PORT` | `5173` | Seal UI |

## 3. Start the stack

```bash
./kymatics.sh up
```

This builds images, starts every service detached, and blocks until the Otter
health endpoint responds. Expect the first run to take several minutes — the
Rust build is the slow part.

## 4. Verify

```bash
./kymatics.sh status
curl http://localhost:8080/healthz    # Otter
curl http://localhost:8090/healthz    # Lavoix
```

Then open the board at `http://localhost:5173`.

The header carries a backend health indicator. Green means Seal is reaching
Otter through the `/api` proxy path; if it is red, the API is not reachable and
nothing else on the board will work.

## 5. Confirm the speech path

Voice is the primary input, so it is worth checking independently of the UI:

```bash
curl -X POST http://localhost:8090/v1/stt/transcribe \
  -F "file=@./sample.wav" \
  -F "provider=mistral"
```

A JSON body containing `text` means transcription is working. If the provider is
reported unavailable, `MISTRAL_API_KEY` did not reach the Lavoix container —
re-run `./kymatics.sh up` so the root `.env` is propagated again.

## Troubleshooting first-run failures

Run the built-in diagnostic first:

```bash
./kymatics.sh doctor
```

It validates that Docker is reachable, the env bootstrap files exist, and
Compose resolves every referenced variable.

| Symptom | Cause | Fix |
|---|---|---|
| Health check times out | Rust image still building | Watch `./kymatics.sh logs -f otter-server` |
| Port already allocated | Host port collision | Change the port in `.env`, then `./kymatics.sh restart` |
| Docker API version mismatch | Stale service image | Rebuild: `./kymatics.sh down` then `./kymatics.sh up` |
| Schema errors after an upgrade | Old volume data | `./kymatics.sh down --volumes` then `./kymatics.sh up` |

## Next

Run your first prompt end to end in
[Your First Voice Build](/tutorials/first-build).
