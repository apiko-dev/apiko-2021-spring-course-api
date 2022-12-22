--liquibase formatted sql

--changeset oleh:0004_product_categories splitStatements:false
INSERT INTO products.categories(name,created_at) VALUES ('Clothing','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Toys & Games','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Cell Phones & Accessories','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Sports & Outdoors','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Electronics','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Beauty','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Home & Kitchen','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Health & Personal Care','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Tools & Home Improvement','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Books','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(name,created_at) VALUES ('Shoes & Jewelry','2021-07-19 17:17:54.421658+00');

--rollback DELETE FROM products.categories;
