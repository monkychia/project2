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
    primary key(id),
    createdAt TIMESTAMP,	
    updatedAt TIMESTAMP default NOW()
    eventListId INTEGER
);

SELECT * FROM FoodLists ORDER BY id;

CREATE TABLE EventLists(
    id INTEGER auto_increment not null,
    eventName VARCHAR(50) not null,
    contactName VARCHAR(50) not null,
    eventDate DATE not null,
    descriptionInfo VARCHAR(300) not null,
    additionalInfo VARCHAR(300) null,
    primary key(id),
    createdAt TIMESTAMP,	
    updatedAt TIMESTAMP default NOW()
);



SELECT * FROM EventLists ORDER BY id;