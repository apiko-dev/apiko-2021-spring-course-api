import { cond, get, sql } from 'services/database';
import * as views from './dbViews';

export function getAccount({ id }) {
  const { query, params } = sql`

    SELECT a.*
    FROM (${views.accounts}) AS a
    WHERE a.id = ${id};

  `.create();

  return get(query, params);
}

export function findAccountByEmail({ email }) {
  const { query, params } = sql`

    SELECT a.*
    FROM (${views.accounts}) AS a
    WHERE a.email = ${email};

  `.create();

  return get(query, params);
}

export function updateAccount({
  userId,
  fullName,
  phone,
  email,
  country,
  city,
  address,
}) {
  const { query, params } = sql`

    UPDATE users.users
    SET
      full_name = ${fullName}::TEXT,
      email = ${email}::TEXT,
      phone = ${phone}::TEXT,
      ${cond(country, sql`country = ${country}::TEXT,`)}
      ${cond(city, sql`city = ${city}::TEXT,`)}
      ${cond(address, sql`address = ${address}::TEXT,`)}
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}::INT
    RETURNING *;

  `.create();

  return get(query, params);
}

export function saveFirstAddress({
  userId,
  country,
  city = null,
  address = null,
}) {
  const { query, params } = sql`

    UPDATE users.users AS u
    SET
      country = ${country}::TEXT
      city = ${city}::TEXT
      address = ${address}::TEXT
      updated_at = CURRENT_TIMESTAMP
    WHERE u.id = ${userId}::INT
      AND u.country IS NULL
    RETURNING *;

  `.create();

  return get(query, params);
}

export function updatePassword({ userId, passwordHash }) {
  const { query, params } = sql`

    UPDATE users.users
    SET
      password_hash = ${passwordHash},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}
    RETURNING *;

  `.create();

  return get(query, params);
}
