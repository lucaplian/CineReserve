ARG NODE_VERSION=22.22.1-alpine
FROM node:${NODE_VERSION} as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chown -R node:node /app
USER node
CMD ["npm", "run", "dev"]

