FROM  node:latest AS builder
 
WORKDIR /frontend
 
COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]