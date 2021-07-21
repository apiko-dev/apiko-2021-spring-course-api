--liquibase formatted sql

--changeset oleh:0003_order_items splitStatements:false
CREATE TABLE orders.order_items
(
	id                SERIAL            	PRIMARY KEY,
	order_id     			INT               	NOT NULL,
	product_id     		INT               	NOT NULL,

	ordered_price			FLOAT								NOT NULL,
	quantity					INT									NOT NULL,

	CONSTRAINT order_items_order_fk FOREIGN KEY (order_id) REFERENCES orders.orders (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,

	CONSTRAINT order_items_product_fk FOREIGN KEY (product_id) REFERENCES products.products (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED
);

--rollback DROP TABLE IF EXISTS orders.order_items;
