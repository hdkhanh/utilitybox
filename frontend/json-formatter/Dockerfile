FROM node:18.17.0-alpine as build-stage
WORKDIR /build

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=build-stage /build/dist /usr/share/nginx/html
COPY --from=build-stage /build/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
