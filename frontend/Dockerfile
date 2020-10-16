# Stage 1: Building Angular

FROM node:14.13-alpine as node
LABEL author="Aziz Zaeny"
WORKDIR /node-app
COPY package*.json /node-app/
RUN npm install
COPY ./ /node-app/
RUN npm run build -- --output-path=./dist/out --prod

# Stage 2: Serving Angular assets with NGINX

FROM nginx:1.19.3-alpine
LABEL author="Aziz Zaeny"
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /node-app/dist/out /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g","daemon off;"]

