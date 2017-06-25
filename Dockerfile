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
ADD projects/pseudoromanian/dist /app/pseudoromana
ADD projects/sidrem/dist /app/sidrem
ADD projects/keygen-radio/dist /app/keygen-radio
ADD projects/papers/dist /app/papers
ADD projects/sibf/dist /app/sibf
ADD projects/chess-puzzles/dist /app/chess-puzzles
ADD projects/identitate-falsa/dist /app/identitate-falsa
ADD projects/horoscop/dist /app/horoscop
ADD projects/jpeg-enricher/dist /app/jpeg-enricher
ADD projects/nechifor-blog/dist /app/
ADD projects/lemon-cake/dist /app/lemon-cake
ADD projects/software-security-slides/clang-static-analyzer /app/clang-static-analyzer
ADD projects/software-security-slides/executable-code-injection /app/executable-code-injection
ADD projects/software-security-slides/using-openvas /app/using-openvas
ADD projects/software-security-slides/using-metasploit /app/using-metasploit
ADD projects/meet-firefox/dist /app/meet-firefox
ADD projects/italia-fascista/dist /app/italia-fascista
ADD projects/rstsd/dist /app/rstsd
ADD projects/go-concurrency/build /app/go-concurrency
RUN mkdir -p /app/multilatex-dissertation
ADD projects/multilatex-dissertation/lucrare.pdf /app/multilatex-dissertation/lucrare.pdf
ADD projects/multilatex-dissertation/rezumat.pdf /app/multilatex-dissertation/rezumat.pdf
ADD projects/multilatex-dissertation/presentation/build /app/multilatex-dissertation/presentation
ADD projects/xslt-blog/dist /app/xslt-blog
ADD projects/facetrain/presentation/build /app/facetrain
ADD projects/best-black-metal-albums/build /app/best-black-metal-albums
ADD projects/nechifor-projects/dist /app/projects

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
