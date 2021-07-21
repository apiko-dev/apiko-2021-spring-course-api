--liquibase formatted sql

--changeset oleh:0003_product_categories splitStatements:false
CREATE TABLE products.categories
(
	id                SERIAL            	PRIMARY KEY,
	name     					TEXT               	NOT NULL,

	created_at        actual_timestamp
);

--rollback DROP TABLE IF EXISTS products.categories;
