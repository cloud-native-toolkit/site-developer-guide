#!/usr/bin/env sh


PORT=${1:-8000}

mkdocs serve --dirtyreload -a "0.0.0.0:${PORT}"
echo "Dev environment running with live reloading enabled. Open http://localhost:${PORT} to see the site"