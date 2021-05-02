FROM node:alpine AS builder

WORKDIR /app
COPY . .
RUN npm install react-scripts -g
RUN npm install
RUN NODE_ENV=production npm run build

FROM node:alpine
RUN npm install serve -g --silent
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 5002
CMD ["serve", "-p", "5002", "-s", "."]