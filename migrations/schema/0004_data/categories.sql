--liquibase formatted sql

--changeset oleh:0004_product_categories splitStatements:false
INSERT INTO products.categories(id,name,created_at) VALUES (1,'Clothing','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (2,'Toys & Games','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (3,'Cell Phones & Accessories','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (4,'Sports & Outdoors','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (5,'Electronics','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (6,'Beauty','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (7,'Home & Kitchen','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (8,'Health & Personal Care','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (9,'Tools & Home Improvement','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (10,'Books','2021-07-19 17:17:54.421658+00');
INSERT INTO products.categories(id,name,created_at) VALUES (11,'Shoes & Jewelry','2021-07-19 17:17:54.421658+00');

--rollback DELETE FROM products.categories;
