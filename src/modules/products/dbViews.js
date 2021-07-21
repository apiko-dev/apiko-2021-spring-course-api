import { categories } from 'categories/dbViews';
import { sql } from 'services/database';

export const plainProducts = sql`

  SELECT
    p.id,
    p.title,
    p.price,
    p.picture,
    p.description,
    p.category_id,
    p.popularity,
    p.archived,
    p.created_at,
    p.updated_at
  FROM products.products AS p

`;

export const products = sql`

  SELECT
    p.*,
    row_to_json(c) AS category
  FROM (${plainProducts}) AS p
    LEFT JOIN (${categories}) AS c ON (p.category_id = c.id)

`;

export function getFavoriteState(value) {
  return sql`

    EXISTS (
      SELECT * FROM products.favorite_products AS f
      WHERE f.product_id = p.id
        AND f.owner_id = ${value}
    ) AS favorite,

  `;
}
