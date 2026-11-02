# Dockerfile for Arghya Modifications Frontend Web App
FROM node:22-alpine

WORKDIR /app

ENV PORT=3001
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

