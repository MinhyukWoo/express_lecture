-- Active: 1666404659179@@127.0.0.1@3306@location
CREATE Table location.locations(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    date DATETIME NOT NULL
);

DESCRIBE location.locations;

CREATE TABLE location.users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

DESCRIBE location.users;