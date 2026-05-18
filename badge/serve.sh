#!/usr/bin/env bash
set -euo pipefail

PORT=${1:-8743}
DIR="$(cd "$(dirname "$0")" && pwd)"

# Kill any existing server on this port
lsof -ti tcp:"$PORT" | xargs kill -9 2>/dev/null || true

echo "  Badge Creator dev server"
echo "  http://localhost:$PORT"
echo ""
echo "  Press Ctrl+C to stop"
echo ""

# Open in browser after a brief delay
(sleep 0.8 && open "http://localhost:$PORT") &

cd "$DIR"
exec python3 -m http.server "$PORT"
