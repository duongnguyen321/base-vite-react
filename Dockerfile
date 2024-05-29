FROM node:20.12.2
WORKDIR /var/app/bank-gateway/base-react
COPY ./package.json .
RUN npm i
COPY . .
