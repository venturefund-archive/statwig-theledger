FROM node:lts-bullseye-slim

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3015

CMD ["yarn", "start"]