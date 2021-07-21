import * as productViews from 'products/dbViews';
import { sql } from 'services/database';

const favoriteValue = sql`o.owner_id`;

export const orderItems = sql`

  SELECT json_agg(items) AS items
  FROM (
    SELECT
      i.id,
      i.quantity,
      i.ordered_price,
      row_to_json(item_product) AS product
    FROM orders.order_items AS i
      LEFT JOIN LATERAL (
        SELECT
          ${productViews.getFavoriteState(favoriteValue)}
          p.*
        FROM (${productViews.products}) AS p
        WHERE p.id = i.product_id
      ) AS item_product ON TRUE
    WHERE i.order_id = o.id
    ORDER BY i.id DESC
  ) AS items

`;

export const orders = sql`

  SELECT
    o.id,
    o.owner_id,
    o.archived,
    o.created_at,
    o.updated_at,
    row_to_json(s) AS shipment,
    order_items.items,
    (
      SELECT SUM(
        (i->>'ordered_price')::FLOAT *
        (i->>'quantity')::INT
      )
      FROM json_array_elements(order_items.items) AS i
    ) AS total_price
  FROM orders.orders AS o
    LEFT JOIN orders.shipments AS s ON (s.order_id = o.id)
    LEFT JOIN LATERAL (${orderItems}) AS order_items ON TRUE

`;
