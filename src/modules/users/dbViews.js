import { sql } from 'services/database';

export const users = sql`

  SELECT
    u.id,
    u.email,
    u.name,
    u.phone,
    p.created_at,
    p.updated_at
  FROM users.users AS u

`;
