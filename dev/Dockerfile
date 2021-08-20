FROM squidfunk/mkdocs-material:7.1.8

RUN apk add --no-cache --update nodejs npm

WORKDIR /site
COPY ./package*.json /site/

# Python Dependencies
RUN pip --no-cache-dir install git+https://github.com/linkchecker/linkchecker@v10.0.1#egg=linkchecker
# NodeJS Dependencies
RUN npm ci
COPY dev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
