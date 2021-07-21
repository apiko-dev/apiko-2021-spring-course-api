--liquibase formatted sql

--changeset oleh:0003_shipments splitStatements:false
CREATE TABLE orders.shipments
(
	id                SERIAL            	PRIMARY KEY,
	order_id     			INT               	NOT NULL,

	full_name					TEXT								NOT NULL,
	phone						  TEXT								NOT NULL,

	country						alphanum_text				NOT NULL,
	city							alphanum_text				NOT NULL,
	address						alphanum_text				NOT NULL,

	CONSTRAINT shipment_order_fk FOREIGN KEY (order_id) REFERENCES orders.orders (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED
);

--rollback DROP TABLE IF EXISTS orders.shipments;
