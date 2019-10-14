#!/bin/sh
if [ "$WITH_SERVER" = 1 ]; then
  sed -i "/frontend_server/ s/# *//" /etc/config/base.conf
else
  sed -i "/static/ s/# *//" /etc/config/base.conf
fi

ln -sf /etc/config/base.conf /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
