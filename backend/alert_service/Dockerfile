FROM node:lts-bullseye-slim

ENV NODE_ENV=production

WORKDIR /src

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3004

CMD ["yarn", "start"]