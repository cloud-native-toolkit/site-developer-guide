#!/usr/bin/env sh

set -e

cspell "docs/**/*.md"
mkdocs build
linkchecker -f linkcheckerrc public
