FROM squidfunk/mkdocs-material:7.1.8 as builder

RUN apk add --no-cache --update nodejs npm

WORKDIR /site
COPY ./ /site/

# Python Dependencies
RUN pip --no-cache-dir install git+https://github.com/linkchecker/linkchecker@v10.0.1#egg=linkchecker
# NodeJS Dependencies
RUN npm ci

RUN npm run build

FROM quay.io/bitnami/nginx

EXPOSE 8080 8443
COPY --from=builder /site/public /app
