#!/usr/bin/env sh

NAME=${1:-devguide-dev}

echo "Cleaning up old container '${NAME}'..."
docker rm "${NAME}" --force 1> /dev/null 2> /dev/null

echo "Finished clean up"