FROM node:12
WORKDIR /usr/app
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install --quite
