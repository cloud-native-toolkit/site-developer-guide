FROM python:alpine

RUN apk add --no-cache \
    build-base \
    git \
    git-fast-import \
    openssh \
    gcc \
    musl-dev \
    jpeg-dev \
    zlib-dev \
    libffi-dev \
    cairo-dev \
    pango-dev \
    gdk-pixbuf-dev \
    ttf-ubuntu-font-family \
    msttcorefonts-installer \
    fontconfig && \
    update-ms-fonts && \
    fc-cache -f

RUN pip install --no-cache-dir pygments==2.8.1 pymdown-extensions==8.1.1 mkdocs==1.1.2 mkdocs-material==7.0.6 mkdocs-minify-plugin==0.4.0 mkdocs-redirects==1.0.1 mkdocs-with-pdf==0.8.3

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
