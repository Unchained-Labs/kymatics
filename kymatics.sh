#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${ROOT_DIR}"

usage() {
  cat <<'EOF'
Kymatics CLI

Usage:
  ./kymatics.sh <command> [options]

Commands:
  up                     Build and start stack with health checks
  down [options]         Stop/remove stack
  restart                Down then up
  status                 Show compose service status
  logs [args...]         Show docker compose logs (pass-through)
  ps                     Alias for status
  doctor                 Check Docker + env bootstrap files
  help                   Show this help

Down options:
  --volumes              Remove named volumes
  --images               Remove local service images
  --keep-orphans         Keep orphan containers

Examples:
  ./kymatics.sh up
  ./kymatics.sh down --volumes
  ./kymatics.sh logs -f otter-server
  ./kymatics.sh restart
EOF
}

ensure_scripts_executable() {
  chmod +x "./scripts/up-stack.sh" "./scripts/down-stack.sh"
}

cmd="${1:-help}"
shift || true

ensure_scripts_executable

case "${cmd}" in
  up)
    ./scripts/up-stack.sh "$@"
    ;;
  down)
    ./scripts/down-stack.sh "$@"
    ;;
  restart)
    ./scripts/down-stack.sh "$@"
    ./scripts/up-stack.sh
    ;;
  status|ps)
    docker compose ps
    ;;
  logs)
    docker compose logs "$@"
    ;;
  doctor)
    echo "==> Docker check"
    if ! command -v docker >/dev/null 2>&1; then
      echo "docker command not found." >&2
      exit 1
    fi
    docker --version
    docker compose version
    echo "==> Env files"
    env_ok=1
    if [[ -f "./.env" ]]; then
      echo "ok: .env"
    else
      env_ok=0
      echo "missing: .env (will auto-bootstrap from .env.example on up)"
    fi
    if [[ "${env_ok}" -eq 1 ]]; then
      echo "==> Compose config"
      docker compose config >/dev/null
      echo "compose config: ok"
      [[ -f "./otter/.env" ]] && echo "ok: otter/.env (propagated)" || echo "missing: otter/.env (will be generated on up)"
      [[ -f "./lavoix/.env" ]] && echo "ok: lavoix/.env (propagated)" || echo "missing: lavoix/.env (will be generated on up)"
    else
      echo "==> Compose config skipped (missing env files)"
    fi
    ;;
  help|-h|--help|"")
    usage
    ;;
  *)
    echo "Unknown command: ${cmd}" >&2
    usage
    exit 1
    ;;
esac
