# build packages
FROM node:14.17-buster-slim AS builder
WORKDIR /dist
COPY ./package.json ./package-lock.json ./
RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

# main image
FROM node:14.7-buster-slim
WORKDIR /app

COPY --from=builder /dist/node_modules ./node_modules
COPY ./ .

CMD ["npm", "run", "docker:dev"]
