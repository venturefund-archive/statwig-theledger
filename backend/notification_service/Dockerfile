FROM node:lts-bullseye-slim

ENV NODE_ENV=production

WORKDIR /src

COPY package.json .

RUN yarn --production

COPY . .

EXPOSE 3006

CMD ["yarn", "start"]