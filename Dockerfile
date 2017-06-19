FROM ubuntu:16.04

RUN apt-get update && \
    apt-get install nginx -y && \
    rm -fr /var/lib/apt/lists/*

# Forward request and error logs to docker log collector.
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

ADD nginx.conf /etc/nginx/nginx.conf

ADD projects/nechifor-home/dist /app
ADD projects/circuits/dist /app/circuits
ADD projects/check-your-privilege/dist /app/check-your-privilege

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
