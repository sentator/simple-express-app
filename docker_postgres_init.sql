CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);

INSERT INTO users (name, age) VALUES ('Alex', 26), ('Dasha', 20), ('Dan', 50);