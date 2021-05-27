FROM squidfunk/mkdocs-material as builder

RUN apk add --no-cache --update nodejs npm

WORKDIR /site
COPY ./package*.json /site/

# Python Dependencies
RUN pip --no-cache-dir install git+https://github.com/linkchecker/linkchecker@v10.0.1#egg=linkchecker
# NodeJS Dependencies
RUN npm ci
