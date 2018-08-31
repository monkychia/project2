DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;
USE exampledb;

CREATE TABLE foodList(
    id INTEGER AUTO_INCREMENT not null,
    itemName VARCHAR(50) not null,
    costPer DECIMAL(10,2) not null,
    glutenFree BOOLEAN DEFAULT false,
    primary key(id)

);

INSERT INTO foodList(itemName, costPer, glutenFree)
VALUES ('Tomato Bruschetta', .50, false),
('Fish Taco', 1.75, false),
('Kid Hot Dog', .85 ,false),
('Kid Mac N Cheese', 1.19 ,false),
('Chicken Strips', .89 ,false),
('Spagehtti Meatballs', 1.26 ,false),
('Tofu Curry', 2.99, true);

SELECT * FROM foodList ORDER BY id;


/*CREATE TABLE newEvent(
    id INTEGER AUTO_INCREMENT not null,
    itemOne VARCHAR(40) not null,
    itemTwo VARCHAR(40) not null,
    itemThree VARCHAR(40) not null,
    itemFour VARCHAR(40) not null,
    primary key (id);
)
