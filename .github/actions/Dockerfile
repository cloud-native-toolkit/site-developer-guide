FROM squidfunk/mkdocs-material as builder

RUN apk add --no-cache --update nodejs npm

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
