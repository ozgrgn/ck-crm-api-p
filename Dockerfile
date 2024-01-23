FROM node:16-slim


WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
COPY . .
 
CMD [ "npm", "start" ]
 