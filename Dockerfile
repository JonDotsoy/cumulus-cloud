FROM node:5.3

RUN mkdir -p /usr/src/cumulus-cloud

COPY . /usr/src/cumulus-cloud

WORKDIR /usr/src/cumulus-cloud

RUN npm install

CMD ["node", "start"]
