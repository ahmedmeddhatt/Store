/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL ,
    price INTEGER NOT NULL CHECK (price > 0) ,
    category VARCHAR(150) NOT NULL ,
);