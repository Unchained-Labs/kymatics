#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

usage() {
  cat <<'EOF'
Usage: ./scripts/up-stack.sh

Bootstraps root .env when missing, propagates it to service env files, then
builds and starts the full stack with health checks.
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ $# -gt 0 ]]; then
  echo "Unknown option: $1" >&2
  usage
  exit 1
fi

if [[ ! -f "./.env" && -f "./.env.example" ]]; then
  echo "==> Bootstrapping root .env from .env.example"
  cp "./.env.example" "./.env"
fi

echo "==> Propagating root .env to service env files"
cp "./.env" "./otter/.env"
cp "./.env" "./lavoix/.env"

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
