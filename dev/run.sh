#!/usr/bin/env bash

NAME="$1"
PORT="$2"

docker run --name "${NAME}" -d -p "${PORT}:${PORT}" -v "${PWD}:/site" quay.io/cloudnativetoolkit/mkdocs serve -f /site/mkdocs.yml --livereload -a "0.0.0.0:${PORT}"
