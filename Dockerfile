FROM python:slim-stretch as builder

RUN pip install --no-cache-dir pygments==2.8.1 pymdown-extensions==8.1.1 mkdocs==1.1.2 mkdocs-material==7.0.6 mkdocs-minify-plugin==0.4.0 mkdocs-redirects==1.0.3 mkdocs-with-pdf==0.8.3 \
  && pip install git+https://github.com/linkchecker/linkchecker.git

WORKDIR /site
COPY ./ /site/

RUN mkdocs build -d /output -f ./mkdocs.yml

FROM quay.io/bitnami/nginx

COPY --from=builder /output /app
