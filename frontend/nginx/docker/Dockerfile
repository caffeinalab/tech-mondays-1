ARG CI_COMMIT_REF_NAME
ARG CI_REGISTRY
ARG CI_PROJECT_PATH
FROM ${CI_REGISTRY}/${CI_PROJECT_PATH}/${CI_COMMIT_REF_NAME}/frontend_client:latest AS frontend_client
FROM nginx:alpine

COPY ./frontend/common/assets/optimized /var/assets
COPY ./frontend/nginx/config /etc/config
COPY ./frontend/nginx/docker/entrypoint.sh /usr/bin/entrypoint
COPY --from=frontend_client /app/dist/public /var/static

ARG WITH_SERVER
ENV WITH_SERVER=$WITH_SERVER

ENTRYPOINT entrypoint
