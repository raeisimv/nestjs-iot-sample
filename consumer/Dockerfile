
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

LABEL  name="IoT-Consumer" author="Raeisi"

WORKDIR /app

COPY package*.json ./
COPY pnpm-*.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build 

FROM base AS production
LABEL  name="IoT-Consumer" author="Raeisi"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY pnpm-*.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

COPY --from=development /app/dist dist

ENV APP_MAIN_FILE="/app/dist/main.js"
CMD node ${APP_MAIN_FILE}
