FROM node:alpine AS builder

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm --legacy-peer-deps install
COPY public ./public
COPY src ./src
RUN NODE_ENV=production npm run build

FROM node:alpine
RUN npm install serve -g --silent
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
