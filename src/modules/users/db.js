import { get, sql } from 'services/database';
import * as views from './dbViews';

export function createUser({ email, fullName, passwordHash, phone }) {
  const { query, params } = sql`

    INSERT INTO
      users.users (email, full_name, password_hash, phone)
    VALUES (${email}, ${fullName}, ${passwordHash}, ${phone})
    RETURNING *;

  `.create();

  return get(query, params);
}

export function getUser(userId) {
  const { query, params } = sql`

    SELECT u.*
    FROM (${views.users}) AS u
    WHERE u.id = ${userId};

  `.create();

  return get(query, params);
}

export function getUserByEmail(email) {
  const { query, params } = sql`

    SELECT u.*
    FROM (${views.users}) AS u
    WHERE u.email = ${email};

  `.create();

  return get(query, params);
}
