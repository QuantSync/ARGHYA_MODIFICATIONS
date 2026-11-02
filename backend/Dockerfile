# Multi-stage Dockerfile for Arghya Modifications Backend
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production

FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache curl

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]
