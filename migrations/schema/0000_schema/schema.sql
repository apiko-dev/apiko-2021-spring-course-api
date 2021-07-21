--liquibase formatted sql

--changeset oleh:0000_users
CREATE SCHEMA IF NOT EXISTS users;
--rollback DROP SCHEMA users CASCADE;

--changeset oleh:0000_products
CREATE SCHEMA IF NOT EXISTS products;
--rollback DROP SCHEMA products CASCADE;

--changeset oleh:0000_orders
CREATE SCHEMA IF NOT EXISTS orders;
--rollback DROP SCHEMA orders CASCADE;
