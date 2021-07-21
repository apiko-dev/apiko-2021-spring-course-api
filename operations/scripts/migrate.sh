#!/usr/bin/env bash

# rebuild liquibase for db migrations (will use cache)
docker build \
  -t 2021_spring_course_liquibase \
	-f ./operations/images/docker/liquibase/Dockerfile . 

# copy extensions.sh script to db container and run to create all db extensions
docker cp ./migrations/bootstrap/. 2021_spring_course_db_1:/scripts/
docker exec -it -e DATABASE_URL=postgres://apiko:apiko@localhost:5432/apiko \
  2021_spring_course_db_1 /scripts/extensions.sh


# run migrations script using liquibase within apiko network
# first argument $1 - command (update, rollbackCount $1)
# second argument $2 - depends on command type - e.g. number for rollbackCount (migrate.sh rollbackCount 1)
docker run --rm -e DATABASE_URL=postgres://apiko:apiko@db:5432/apiko \
  --net=2021_spring_course_apiko_network --name=2021_spring_course_liquibase 2021_spring_course_liquibase \
  -- $1 $2
