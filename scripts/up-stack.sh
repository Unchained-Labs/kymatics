#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

if [[ ! -f "./otter/.env" && -f "./otter/.env.example" ]]; then
  echo "==> Bootstrapping ./otter/.env from .env.example"
  cp "./otter/.env.example" "./otter/.env"
fi

if [[ ! -f "./lavoix/.env" && -f "./lavoix/.env.example" ]]; then
  echo "==> Bootstrapping ./lavoix/.env from .env.example"
  cp "./lavoix/.env.example" "./lavoix/.env"
fi

echo "==> Starting full stack (build + detached)"
docker compose up -d --build

echo "==> Waiting for Otter API health"
max_attempts=60
attempt=0
until curl -fsS "http://localhost:${OTTER_PORT:-8080}/healthz" >/dev/null; do
  attempt=$((attempt + 1))
  if [[ "${attempt}" -ge "${max_attempts}" ]]; then
    echo "Otter health check failed after ${max_attempts} attempts."
    echo "Run: docker compose logs otter-server otter-worker"
    exit 1
  fi
  sleep 2
done

echo "==> Otter is healthy"
echo "==> Waiting for Lavoix health"
attempt=0
until curl -fsS "http://localhost:${LAVOIX_PORT:-8090}/healthz" >/dev/null; do
  attempt=$((attempt + 1))
  if [[ "${attempt}" -ge "${max_attempts}" ]]; then
    echo "Lavoix health check failed after ${max_attempts} attempts."
    echo "Run: docker compose logs lavoix"
    exit 1
  fi
  sleep 2
done

echo "==> Lavoix is healthy"
echo "Seal UI:  http://localhost:${SEAL_PORT:-5173}"
echo "Otter API: http://localhost:${OTTER_PORT:-8080}"
echo "Lavoix:    http://localhost:${LAVOIX_PORT:-8090}"
