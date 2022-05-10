#Yakorev Volodymyr
FROM node:10-slim
LABEL maintainer="Yakore Volodymyr <yakorev.volodymyr@pollub.edu.pl>"

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --production

EXPOSE 3000
CMD [ "node", "server.js" ]