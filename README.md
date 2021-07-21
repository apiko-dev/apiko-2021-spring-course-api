# Apiko 2021 spring courses API

API - https://apiko-2021-spring-course-api.herokuapp.com/

API Docs - https://apiko-2021-spring-course-api.herokuapp.com/documentation

## Installation

Clone repository and install project dependencies
```bash
git clone https://github.com/apiko-dev/apiko-2021-spring-course-api
cd apiko-2021-spring-course-api
npm i
```

## Environment variables
Add your `.env` file with required environment variables e.g.

```sh
DATABASE_URL=postgres://apiko:apiko@db:5432/apiko
# For deployed db - `TRUE`, for local db - `FALSE`
PGSSL=FALSE
# For deployed db - `no-verify`, for local db - `FALSE`
PGSSLMODE=FALSE
```

## Docker

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) for your system

### Scripts

Build docker images:

```bash
npm run docker:build
```

Run docker app:

```bash
npm run docker:run
```

Run db migrations:

```bash
npm run docker:migrate:update
npm run docker:migrate:rollback
npm run docker:migrate:rollback:all
```

### Connect to db container

If you want to connect to database from root machine, you can connect to database with a name `apiko` on `localhost:5452` with username/password `apiko` - `postgres://apiko:apiko@localhost:5452/apiko`.

To connect to database within docker network, connect to `db:5432`.

### Connect to api container

If you want to connect to api from root machine, you can connect to `localhost:8090`.

To connect to api within docker network, connect to `api:8090`.

## SQL syntax highlight in js files.

Use [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dgadelha.vscode-sql-template-literal-with-prefixes) for
Syntax highlighting for code like:

```js
const query = sql`SELECT * FROM users`;
```

## Deploy on [Heroku](https://dashboard.heroku.com)

Create [free Heroku account](https://dashboard.heroku.com) and create new app from dashboard.

Download, install and login into [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

Set and add the following buildpacks using heroku cli:
```bash
$ heroku buildpacks:set heroku/nodejs -a YOUR_HEROKU_PROJECT_NAME
$ heroku buildpacks:add heroku/jvm -a YOUR_HEROKU_PROJECT_NAME
```

Install [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) and provision it to your heroku app.

### Config Vars

Open your heroku app `Settings` from dashboard and set following `Config Vars` from Heroku Postgres credentials:
```sh
DATABASE_URL=
PGSSL=TRUE
PGSSLMODE=no-verify
```

Also set the following `Config Vars`:
```sh
HOST=YOUR_HEROKU_PROJECT_NAME.herokuapp.com
SECRET1=
SECRET2=
```

### Add the heroku remote to the git repository

```bash
heroku git:remote -a YOUR_PROJECT_HEROKU_GIT_URL
```

### Deploy your changes:

```bash
git push heroku master
```

or

```bash
git push heroku local_branch_name:master
```
