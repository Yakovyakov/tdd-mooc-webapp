FROM nginx:1.20

CMD ["nginx", "-g", "daemon off;"]

RUN mkdir /usr/share/nginx/html/api && \
    echo "Hello from backend" > /usr/share/nginx/html/api/hello.html
