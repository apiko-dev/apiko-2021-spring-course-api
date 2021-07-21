import { sql } from 'services/database';

export const categories = sql`

  SELECT
    c.id,
    c.name,
    c.created_at
  FROM products.categories AS c

`;
