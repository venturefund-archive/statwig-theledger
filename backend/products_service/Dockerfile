FROM node:18-bullseye-slim

ENV NODE_ENV=production

WORKDIR /src

COPY . /src

RUN mkdir images

RUN yarn --production && yarn cache clean

EXPOSE 3010

CMD ["yarn", "start"]