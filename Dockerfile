FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Додаємо інструменти для компіляції
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG APP_NAME=gateway

RUN npm run build ${APP_NAME}


FROM node:20-alpine AS runner

WORKDIR /usr/src/app_runner

ARG APP_NAME=gateway
ARG APP_PORT=3000

ENV PORT=${APP_PORT}

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/${APP_NAME} ./dist
COPY --from=builder /usr/src/app/.env ./.env

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]
