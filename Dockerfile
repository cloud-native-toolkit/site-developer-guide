FROM node:14-stretch as builder

RUN apt-get update && apt-get -y install libjemalloc1
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.1

ENV HOME /home/dev

RUN mkdir -p $HOME/.npm && mkdir -p $HOME/app && chown -R 1001:0 $HOME

USER 1001

WORKDIR $HOME/app

RUN npm config set prefix $HOME/.npm

COPY --chown=1001:0 . .

RUN npm ci && npm run clean && npm run build

FROM bitnami/nginx

COPY --from=builder /home/dev/app/public /app
