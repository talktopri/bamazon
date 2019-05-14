DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
price DECIMAL (8,2) NOT NULL, 
stock_quantity INT,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Aquaman", 14.99, 12);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("GOT Season 8", 34.95, 4);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("How to Train your Dragon, the Hidden World", 25.99, 20);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Apollo 11", 19.96, 18);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Captain Marvel", 29.99, 12);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Spider-Man: into the Spiderverse ", 22.96, 3);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("John Wick", 10.99, 7);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Avengers: Infinity War", 20.99, 16);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Mary Poppins Returns", 14.99, 19);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Shazam!", 24.96, 22);