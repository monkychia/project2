DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;
USE exampledb;

CREATE TABLE FoodLists(
    id INTEGER auto_increment not null,
    itemName VARCHAR(50) not null,
    costPer DECIMAL(10,2) not null,
    category VARCHAR(50) not null,
    vegan BOOLEAN default false,
    glutenFree BOOLEAN default false,
    createdAt TIMESTAMP default NOW(),	
    updatedAt TIMESTAMP default NOW(),
    eventListId INTEGER,
    primary key(id)
);
