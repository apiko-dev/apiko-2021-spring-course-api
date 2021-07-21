--liquibase formatted sql

--changeset oleh:0003_users splitStatements:false
CREATE TABLE users.users
(
	id                 	SERIAL              PRIMARY KEY,

	email           	 	email    						NOT NULL,
  password_hash      	password_hash      	NOT NULL,
	password_hash_type 	password_hash_func	NOT NULL DEFAULT 'bcrypt',

  full_name      	    alphanum_string     NOT NULL,
  phone              	phone								NOT NULL,

	country							alphanum_text,
	city							  alphanum_text,
	address							alphanum_text,

	created_at         	actual_timestamp,
	updated_at         	actual_timestamp
);

CREATE UNIQUE INDEX user_email_unique
	ON users.users(email);

--rollback DROP INDEX IF EXISTS users.user_email_unique;
--rollback DROP TABLE IF EXISTS users.users;
