FROM node:10-alpine AS modules
WORKDIR /app

RUN apk add --no-cache git --update

# Install dependencies
COPY ./frontend/client/app/package.json ./
COPY ./frontend/client/app/package-lock.json ./
RUN npm install

FROM node:10-alpine
RUN apk add --no-cache bash --update

WORKDIR /app

COPY ./frontend/client/app/ /app/
COPY ./frontend/common/views /app/views
COPY ./frontend/common/fixtures /app/fixtures
COPY ./frontend/common/locales /app/locales
COPY --from=modules /app/node_modules /app/node_modules
COPY ./frontend/client/docker/entrypoint.sh /usr/bin/entrypoint

ARG WITH_SERVER
ENV WITH_SERVER=$WITH_SERVER

ARG WITH_STORYBOOK
ENV WITH_STORYBOOK=$WITH_STORYBOOK

# Keep here or won't install necessary node_modules!
ENV NODE_ENV=production
RUN npm run build:production

ENTRYPOINT ["entrypoint"]
