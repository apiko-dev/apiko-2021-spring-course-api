#!/bin/bash
set +e

cd "$(dirname "$0")"

[ ! -z $DATABASE_URL ] || DATABASE_URL=postgres://apiko:apiko@localhost:5452/apiko

psql $DATABASE_URL -f extensions.sql -At
