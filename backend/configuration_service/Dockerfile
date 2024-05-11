FROM node:lts-bullseye-slim

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3020

CMD yarn start