FROM node:4-slim

LABEL maintainer "Sebastian Allende <s.allende89@gmail.com>"

COPY ./package.json /app/

WORKDIR /app

RUN npm install

COPY ./ /app

CMD npm start

EXPOSE 3000
