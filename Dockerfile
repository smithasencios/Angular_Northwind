FROM node:10-alpine as builder

ENV PACKAGE_DIR=/packaged-dist
WORKDIR /src

RUN apk --update upgrade  && \
  apk add --no-cache ca-certificates openssh-client curl git bash

RUN mkdir -p $PACKAGE_DIR && \
    rm -rf node_modules && \
    rm -rf dist

COPY package-lock.json .
COPY package.json .

RUN npm install

ADD . .
# CMD ["./node_modules/.bin/ng","serve","--host","0.0.0.0"]

RUN ./node_modules/.bin/ng build \
  --progress=false \
  --prod \
  --source-map \
  --output-path=$PACKAGE_DIR

# Build a small nginx image with static website
FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY docker/run.sh /run.sh
# COPY docker/nginx.conf /tmp/nginx.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder $PACKAGE_DIR /usr/share/nginx/html

CMD ["/run.sh"]