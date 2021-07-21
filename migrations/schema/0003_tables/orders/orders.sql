--liquibase formatted sql

--changeset oleh:0003_orders splitStatements:false
CREATE TABLE orders.orders
(
	id                SERIAL            	PRIMARY KEY,
	owner_id     			INT               	NOT NULL,

	archived					BOOLEAN							NOT NULL DEFAULT FALSE,

	created_at        actual_timestamp,
	updated_at        actual_timestamp,

	CONSTRAINT orders_owner_fk FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX IF NOT EXISTS orders_owners_index ON orders.orders (owner_id);

--rollback DROP INDEX IF EXISTS orders.orders_owners_index;
--rollback DROP TABLE IF EXISTS orders.orders;
