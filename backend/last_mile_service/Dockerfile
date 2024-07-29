FROM node:lts-bullseye-slim

ENV NODE_ENV=production

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3016

CMD ["yarn", "start"]