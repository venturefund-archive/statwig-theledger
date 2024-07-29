FROM node:lts-bullseye-slim

WORKDIR /src

COPY . /src

RUN yarn install

EXPOSE 3018

CMD yarn run start