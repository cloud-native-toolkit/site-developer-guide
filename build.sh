#!/usr/bin/env sh

set -e

cspell "docs/**/*.md"
mkdocs build
linkchecker -r 3 -f linkcheckerrc public
