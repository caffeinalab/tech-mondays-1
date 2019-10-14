FROM ustwo/browser-sync

COPY ./docker/utils/wait-for-it.sh /usr/bin/wait-for-it
COPY ./frontend/browser-sync/docker/entrypoint.sh /usr/bin/entrypoint

EXPOSE 80

ENTRYPOINT [ "entrypoint" ]
