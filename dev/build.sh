#!/usr/bin/env bash

docker run -ti --rm -v "${PWD}:/site" --entrypoint "/bin/sh" quay.io/cloudnativetoolkit/mkdocs -c "mkdocs build -f /site/mkdocs.yml && linkchecker -f /site/linkcheckerrc --check-extern /site/public"
