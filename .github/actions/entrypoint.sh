#!/usr/bin/env sh

cd "${GITHUB_WORKSPACE}"

# Python Dependencies
pip --no-cache-dir install git+https://github.com/linkchecker/linkchecker@v10.0.1#egg=linkchecker
# NodeJS Dependencies
npm ci

npm run build
