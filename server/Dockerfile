FROM node:lts-alpine 

WORKDIR /server

COPY . .
COPY .package*.json ./
COPY .env ./

RUN yarn install

ENV DOCKER=db

EXPOSE 5000

CMD ["yarn", "start"]