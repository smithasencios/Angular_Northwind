FROM node:10-alpine

WORKDIR /src

RUN apk --update upgrade  && \
  apk add --no-cache ca-certificates openssh-client curl git bash

RUN rm -rf node_modules && \
    rm -rf dist

COPY package-lock.json .
COPY package.json .

RUN npm install

ADD . .

CMD ["./node_modules/.bin/ng","serve","--host","0.0.0.0","--disableHostCheck","true"]
