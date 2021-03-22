FROM node:12-stretch as builder

ENV HOME /home/dev

RUN mkdir -p $HOME/.npm && mkdir -p $HOME/app && chown -R 1001:0 $HOME && chmod -R og+rw $HOME

USER 1001

WORKDIR $HOME/app

RUN npm config set prefix $HOME/.npm

COPY . .

RUN npm ci && npm run build

FROM bitnami/nginx

COPY --from=builder ./public /app
