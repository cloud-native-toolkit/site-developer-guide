
@echo on

cspell "docs/**/*.md"
mkdocs build
linkchecker -f linkcheckerrc public
