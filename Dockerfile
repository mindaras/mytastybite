FROM node:18-alpine as build

WORKDIR /usr/app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm ci

ARG DATABASE_URL="postgresql://postgres:mysecretpassword@host.docker.internal:5432/mytastybite?schema=public"

ENV DATABASE_URL=$DATABASE_URL

COPY . .

RUN npm run "db:generate"

RUN npm run "db:migrate:deploy"

RUN npm run "sitemap:generate"

RUN npm run build

FROM node:18-alpine as app

WORKDIR /usr/app

ARG DATABASE_URL="postgresql://mytastybite:mysecretpassword@host.docker.internal:5432/mytastybite?schema=public"

ARG CACHE_PASSWORD

ARG ADMIN_USERNAME

ARG ADMIN_PASSWORD

ARG AWS_ACCESS_KEY

ARG AWS_SECRET_ACCESS_KEY

ENV DATABASE_URL=$DATABASE_URL

ENV CACHE_PASSWORD=$CACHE_PASSWORD

ENV ADMIN_USERNAME=$ADMIN_USERNAME

ENV ADMIN_PASSWORD=$ADMIN_PASSWORD

ENV AWS_ACCESS_KEY=$AWS_ACCESS_KEY

ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ENV HOSTNAME "0.0.0.0"

COPY --from=build /usr/app/.next/standalone .

COPY --from=build /usr/app/public ./public

COPY --from=build /usr/app/.next/static ./.next/static

CMD ["node", "server.js"]