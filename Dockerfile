FROM node:20-alpine3.17 as server

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build