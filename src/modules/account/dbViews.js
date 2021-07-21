import { sql } from 'services/database';

export const accounts = sql`

  SELECT
    u.id,
    u.email,
    u.password_hash,
    u.password_hash_type,
    u.full_name,
    u.phone,
    u.country,
    u.city,
    u.address,
    u.created_at,
    u.updated_at
  FROM users.users AS u

`;
