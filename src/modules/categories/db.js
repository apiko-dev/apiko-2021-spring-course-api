import { get, getList, sql } from 'services/database';
import * as views from './dbViews';

export function getCategories() {
  const { query, params } = sql`

    SELECT c.*
    FROM (${views.categories}) AS c;

  `.create();

  return getList(query, params);
}

export function getCategory({ id }) {
  const { query, params } = sql`

    SELECT c.*
    FROM (${views.categories}) AS c
    WHERE c.id = ${id};

  `.create();

  return get(query, params);
}
