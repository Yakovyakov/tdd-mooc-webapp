# FROM nginx:1.20

# RUN mkdir /usr/share/nginx/html/api && \
#     echo "Hello from backend" > /usr/share/nginx/html/api/hello.html


FROM node:20
  
WORKDIR /usr/src/app


COPY --chown=node:node . .

RUN npm ci --omit=dev

  

USER node

CMD npm start
