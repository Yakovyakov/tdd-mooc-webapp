

# The first FROM is now a stage called build-stage

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

# In production we must change the value of the url to the public url relative to the reverse proxy
ENV VITE_BACKEND_URL="http://localhost:8080/api"

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except for the files that we want to COPY

FROM nginx:1.20

COPY docker/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html


