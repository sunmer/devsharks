FROM node:9.8.0

RUN mkdir /web

WORKDIR /web
COPY package.json /web/package.json
RUN npm install

CMD npm run start-dev
