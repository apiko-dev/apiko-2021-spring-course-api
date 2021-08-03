import { get, getList, sql, ifDef } from 'services/database';
import * as views from './dbViews';
import * as constants from './constants';

export function getProducts({ userId, limit, offset, sortBy }) {
  const orderBy =
    sortBy === constants.sortOptions.popular
      ? sql`p.popularity DESC NULLS LAST, p.id DESC`
      : sql`p.id DESC`;

  const { query, params } = sql`

    SELECT
      ${ifDef(userId, views.getFavoriteState(userId))}
      p.*
    FROM (${views.products}) AS p
    ORDER BY ${orderBy}
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function getProduct({ id, userId }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(userId, views.getFavoriteState(userId))}
      p.*
    FROM (${views.products}) AS p
    WHERE p.id = ${id};

  `.create();

  return get(query, params);
}

export function addToFavorites({ id, userId }) {
  const { query, params } = sql`

    INSERT INTO
      products.favorite_products(product_id, owner_id)
    SELECT ${id}, ${userId}
    RETURNING *;

  `.create();

  return get(query, params);
}

export function deleteFavorite({ id, userId }) {
  const { query, params } = sql`

    DELETE FROM products.favorite_products
    WHERE product_id = ${id}
      AND owner_id = ${userId}
    RETURNING *;

  `.create();

  return get(query, params);
}

export function getFavoriteProducts({ userId, limit, offset }) {
  const { query, params } = sql`

    SELECT
      p.*,
      TRUE AS favorite
    FROM products.favorite_products AS f
      LEFT JOIN (${views.products}) AS p ON (f.product_id = p.id)
    WHERE f.owner_id = ${userId}
    ORDER BY f.id DESC
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function addMultipleToFavorites({ userId, ids }) {
  const { query, params } = sql`

    INSERT INTO
      products.favorite_products(product_id, owner_id)
    SELECT p.id, ${userId}
    FROM UNNEST(${ids}::INT[]) AS ids
      JOIN products.products AS p ON (p.id = ids)
    WHERE NOT EXISTS (
      SELECT *
      FROM products.favorite_products AS f
      WHERE f.owner_id = ${userId}
        AND f.product_id = p.id
    )
    ORDER BY array_position(${ids}::INT[], p.id)
    RETURNING *;

  `.create();

  return getList(query, params);
}

export function getProductsByIds({ userId, ids }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(userId, views.getFavoriteState(userId))}
      p.*
    FROM (${views.products}) AS p
      WHERE p.id = ANY(${ids}::INT[])
    ORDER BY array_position(${ids}::INT[], p.id);

  `.create();

  return getList(query, params);
}

export function getPlainProductsByIds({ ids }) {
  const { query, params } = sql`

    SELECT
      p.*
    FROM (${views.plainProducts}) AS p
      WHERE p.id = ANY(${ids}::INT[])
    ORDER BY array_position(${ids}::INT[], p.id);

  `.create();

  return getList(query, params);
}

export function searchProducts({ userId, keywords, limit, offset }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(userId, views.getFavoriteState(userId))}
      ${keywords} <<-> p.title AS k_dist,
      p.*
    FROM (${views.products}) as p
    WHERE ${keywords} <% p.title
    ORDER BY k_dist, p.id DESC
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function getProductsByCategory({
  userId,
  category,
  limit,
  offset,
  sortBy,
}) {
  const orderBy =
    sortBy === constants.sortOptions.popular
      ? sql`p.popularity DESC NULLS LAST, p.id DESC`
      : sql`p.id DESC`;

  const { query, params } = sql`

    SELECT
      ${ifDef(userId, views.getFavoriteState(userId))}
      (${category})::JSON AS category,
      p.*
    FROM (${views.plainProducts}) as p
    WHERE p.category_id = ${category.id}
    ORDER BY ${orderBy}
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}
