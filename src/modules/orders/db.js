import { get, getList, sql } from 'services/database';

import * as views from './dbViews';

export function getUserOrders({ userId, limit, offset }) {
  const { query, params } = sql`

    SELECT o.*
    FROM (${views.orders}) AS o
    WHERE o.owner_id = ${userId}
    ORDER BY o.id DESC
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function getOrder({ id, userId }) {
  const { query, params } = sql`

    SELECT o.*
    FROM (${views.orders}) AS o
    WHERE o.id = ${id}
      AND o.owner_id = ${userId};

  `.create();

  return get(query, params);
}

export function createOrder({ userId, items, shipment }) {
  const { query, params } = sql`

    WITH new_order AS (
      INSERT INTO orders.orders(owner_id)
      VALUES (${userId})
      RETURNING *
    ), order_items AS (
      INSERT INTO
        orders.order_items(order_id, product_id, ordered_price, quantity)
      SELECT
        o.id,
        p.id,
        p.price,
        (item->>'quantity')::INT
      FROM
        new_order AS o,
        UNNEST(${items}::JSON[]) AS item
        LEFT JOIN products.products AS p ON ((item->>'productId')::INT = p.id)
      RETURNING *
    ), order_shipment AS (
      INSERT INTO orders.shipments
        (order_id, full_name, country, city, address, phone)
      SELECT
        o.id,
        ${shipment.fullName},
        ${shipment.country},
        ${shipment.city},
        ${shipment.address},
        ${shipment.phone}
      FROM new_order AS o
      RETURNING *
    )
    SELECT id
    FROM new_order;

  `.create();

  return get(query, params);
}
