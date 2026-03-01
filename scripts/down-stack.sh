#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

remove_volumes=0
remove_images=0
remove_orphans=1

usage() {
  cat <<'EOF'
Usage: ./scripts/down-stack.sh [options]

Stop and remove the Kymatics Docker Compose stack.

Options:
  --volumes         Also remove named volumes
  --images          Also remove local images used by services
  --keep-orphans    Do not remove orphan containers
  -h, --help        Show this help message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --volumes)
      remove_volumes=1
      shift
      ;;
    --images)
      remove_images=1
      shift
      ;;
    --keep-orphans)
      remove_orphans=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

args=(down)
if [[ "${remove_orphans}" -eq 1 ]]; then
  args+=(--remove-orphans)
fi
if [[ "${remove_volumes}" -eq 1 ]]; then
  args+=(--volumes)
fi
if [[ "${remove_images}" -eq 1 ]]; then
  args+=(--rmi local)
fi

echo "==> Stopping stack: docker compose ${args[*]}"
docker compose "${args[@]}"
echo "==> Stack stopped."
