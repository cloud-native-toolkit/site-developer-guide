#!/usr/bin/env sh

set -x

NAME=${1:-devguide-dev}
PORT=${2:-8000}
IMAGE=${3:-devguide-dev}

docker run --name "${NAME}" -d -p "${PORT}:${PORT}" -v "${PWD}:/site" ${IMAGE}
echo "Dev environment running with live reloading enabled. Open http://localhost:${PORT} to see the site"
echo "For live logs run:"
echo "docker logs -f ${NAME}"
