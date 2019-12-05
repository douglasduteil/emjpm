FROM node:10-apine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile

COPY next.config.js /app/
COPY .next/ /app/.next
COPY static/ /app/static

ENTRYPOINT ["yarn", "start:build"]
