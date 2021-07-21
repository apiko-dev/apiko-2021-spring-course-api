FROM debian:buster-slim AS liquibase

ENV SECURITY_UPDATES 2021-06-26

COPY ./operations/images/docker/sources.list /etc/apt/sources.list
RUN apt-get update && \
    apt-get upgrade -y && \
    mkdir -p /usr/share/man/man1 && \
    apt-get install -y --no-install-recommends default-jre groovy && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

COPY ./migrations/schema /
RUN chmod u+x /liquibase.groovy

ENTRYPOINT [ "/liquibase.groovy" ]
