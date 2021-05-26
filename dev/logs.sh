#!/usr/bin/env sh

set -x

NAME=${1:-devguide-dev}
docker logs -f ${NAME}