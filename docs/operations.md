# Operations

This guide describes how to run and operate the Kymatics stack locally.

## Prerequisites

- Docker Engine + Docker Compose plugin
- Git (with submodule support)
- Optional: Python + pre-commit for local quality gates
- Docker socket access on host (`/var/run/docker.sock`) for Otter sibling-container runtime

## First Run

```bash
cp .env.example .env
./kymatics.sh up
```

`up` builds images, starts services, and waits for healthy runtime.

## Daily Commands

```bash
./kymatics.sh status
./kymatics.sh logs -f otter-server
./kymatics.sh down
./kymatics.sh down --volumes
./kymatics.sh restart
./kymatics.sh doctor
```

## Environment Model

- Edit only `kymatics/.env` for stack-level values.
- Keep API keys and runtime tuning in root `.env`.
- Use `.env.example` as the canonical template for onboarding.
- Sibling container runtime keys:
  - `OTTER_RUNTIME_ENABLED`
  - `OTTER_RUNTIME_DOCKER_SOCKET`
  - `OTTER_RUNTIME_NETWORK`
  - `OTTER_RUNTIME_CONTAINER_PREFIX`
  - `OTTER_RUNTIME_IMAGE_PREFIX`
  - `OTTER_RUNTIME_DEFAULT_HOST`

## Common Troubleshooting

- Port collision (`5432`, `6379`, `8080`, `8090`, `5173`):
  - change host port values in `.env`, then restart.
- Stale state after schema/data drift:
  - `./kymatics.sh down --volumes` then `./kymatics.sh up`.
- Missing env values:
  - run `./kymatics.sh doctor` to validate expected files and compose resolution.
- Runtime shell/browser preview unavailable:
  - verify Docker socket mount in `docker-compose.yml`
  - confirm `OTTER_RUNTIME_ENABLED=true`
  - check `otter-server` logs for Docker API errors

## Security Note (Sibling Containers)

- `otter-server` and `otter-worker` mount the host Docker socket to orchestrate workspace sibling containers.
- This grants high host privileges to these services; only run in trusted local/dev environments unless hardened with strict host controls.

## Documentation Boundaries

- Stack docs live in this `docs/` folder.
- Service-specific implementation and API details remain in:
  - `otter/docs/`
  - `seal/README.md`
  - `lavoix/README.md`
