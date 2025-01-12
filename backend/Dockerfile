FROM  node:latest AS builder

WORKDIR /backend
 
COPY package.json .

RUN npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "run", "server"]