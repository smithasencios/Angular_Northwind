#!/bin/sh

set -e

# export RESOLVER=$(cat /etc/resolv.conf |grep 'nameserver' |head -1 |sed 's/nameserver\s*//g')
# echo "resolver: $RESOLVER"

# sed -i "s#_ENV_API_BASE_URL_#$API_BASE_URL#g" /usr/share/nginx/html/main.*.js

# envsubst '${RESOLVER},${LISTEN_PORT},${SERVER_NAME},${API_SERVER_URL},${API_SERVER_HOST}' < /tmp/nginx.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
