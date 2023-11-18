FROM node:18.17.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src ./
RUN npm run build

CMD ["npm", "run", "serve"]