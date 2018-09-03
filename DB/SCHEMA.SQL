DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;
USE exampledb;

CREATE TABLE foodList(
    id INTEGER auto_increment not null,
    itemName VARCHAR(50) not null,
    costPer DECIMAL(10,2) not null,
    category VARCHAR(50) not null,
    vegan BOOLEAN default false,
    glutenFree BOOLEAN default false,
    primary key(id)
);

INSERT INTO foodList(itemName, costPer, category, vegan, glutenFree)
VALUES ('Tomato Bruschetta', .89, 'Appetizer', true, false),
('Olive Tapenade', .89, 'Appetizer', true, false),
('Kid Hot Dog', 1.19 , 'Kids Food', false, false),
('Kid Mac N Cheese', 1.69 , 'Kids Food', false, false),
('Chicken Strips', 1.89 , 'Kids Food', false, false),
('Spagehtti Meatballs', 2.26 , 'Kids Food', false, false),
('Tofu Curry', 8.99, 'Entree', true, true),
('Prime Rib', 12.99, 'Entree', false, true),
('Chicken Piccata', 9.89, 'Entree', false, false),
('Fried Green Tomatos', 1.26, 'Appetizer', false, false),
('Crab Cakes', 1.89, 'Appetizer', false, false),
('Arincini', .78, 'Appetizer', false, false),
('Creme Brulee', 1.70, 'Dessert', false, true),
('Shrimp Cocktail', 1.89, 'Appetizer', false, true),
('Flourless Chocolate Cake', 2.99, 'Dessert', false, true),
('Parmesan Crusted Halibut', 13.49, 'Entree', false, false),
('Grilled Vegetables', 2.39, 'Sides', true, true),
('French Fries', 1.99, 'Sides', true, true),
('Stroganoff', 11.45, 'Entree', false, false),
('Beef Wellington', 16.99, 'Entree', false, false),
('House Salad', 3.19, 'Sides', true, true),
('Salmon Cesar', 11.89, 'Entree', false, false),
('Chicken Cesar', 10.65, 'Entree', false, false),
('House Cesar', 3.29, 'Sides', false, false),
('Chocolate Chip Cookie', 1.59, 'Dessert', false, false),
('Ice Cream', 2.69, 'Dessert', false, true),
('Mashed Potatos', 1.99, 'Sides', false, true),
('Rice Pilaf', 1.49, 'Sides', true, true),
('Hamburger', 8.99, 'Entree', false, false),
('Steak Au Poivre', 12.79, 'Entree', false, true),
('Lentil Soup', 2.89, 'Sides', true, true),
('Roasted Fingerling Potatos', 1.79, 'Sides', true, true),
('Sauteed Chanterelles', 3.99, 'Sides', true, true),
('Sausage Stuffed Creminis', 1.70, 'Appetizer', false, true),
('Chips and Salsa', .99, 'Appetizer', true, true),
('Grilled Portabello', 8.29, 'Entree', true, true),
('Herb Polenta Cake', 1.99, 'Sides', true, true);



SELECT * FROM foodList ORDER BY id;


/*CREATE TABLE newEvent(
    id INTEGER AUTO_INCREMENT not null,
    itemOne VARCHAR(40) not null,
    itemTwo VARCHAR(40) not null,
    itemThree VARCHAR(40) not null,
    itemFour VARCHAR(40) not null,
    primary key (id);
)
