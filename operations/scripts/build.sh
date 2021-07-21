#!/usr/bin/env bash

# build app composition
docker-compose -p 2021_spring_course build

# build liquibase for db migrations
docker build \
  -t 2021_spring_course_liquibase \
	-f ./operations/images/docker/liquibase/Dockerfile . 
