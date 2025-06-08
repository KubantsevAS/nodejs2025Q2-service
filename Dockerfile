FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc

ENV PORT=4000
ENV HOST=0.0.0.0

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
