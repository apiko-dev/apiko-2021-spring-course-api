--liquibase formatted sql

--changeset oleh:0003_favorite_products splitStatements:false
CREATE TABLE products.favorite_products
(
	id					SERIAL	PRIMARY KEY,
	product_id 	INT 		NOT NULL,
	owner_id 		INT 		NOT NULL,

	created_at	actual_timestamp,

	CONSTRAINT favorite_products_product_fk
	FOREIGN KEY (product_id) REFERENCES products.products (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT favorite_products_owner_fk
	FOREIGN KEY (owner_id) REFERENCES users.users (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT favorite_products_unique UNIQUE (owner_id, product_id)
);

--rollback DROP TABLE IF EXISTS products.favorite_products;
