FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22.14.0-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm ci --only=production

COPY prisma ./prisma/

RUN npx prisma generate

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc
COPY migrate.sh ./

RUN chmod +x migrate.sh

ENV PORT=4000
ENV HOST=0.0.0.0

EXPOSE 4000

CMD ["./migrate.sh"]
