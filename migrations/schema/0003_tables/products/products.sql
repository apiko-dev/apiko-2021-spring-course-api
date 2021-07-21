--liquibase formatted sql

--changeset oleh:0003_products splitStatements:false
CREATE TABLE products.products
(
	id                SERIAL            	PRIMARY KEY,

	title           	TEXT								NOT NULL,
  price             FLOAT 							NOT NULL,
	picture 					TEXT,
  description      	TEXT,

	category_id 			INT									NOT NULL,
	popularity			  INT,

	archived					BOOLEAN							NOT NULL DEFAULT FALSE,

	created_at        actual_timestamp,
	updated_at        actual_timestamp,

	CONSTRAINT product_category_fk FOREIGN KEY (category_id) REFERENCES products.categories (id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
		DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX IF NOT EXISTS product_search_trgm
	ON products.products
	USING GIST (title gist_trgm_ops);

CREATE INDEX IF NOT EXISTS product_popularity_index
	ON products.products (popularity DESC NULLS LAST);

--rollback DROP INDEX IF EXISTS products.product_popularity_index;
--rollback DROP INDEX IF EXISTS products.product_search_trgm;
--rollback DROP TABLE IF EXISTS products.products;
