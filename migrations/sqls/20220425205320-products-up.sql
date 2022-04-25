/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(150) UNIQUE ,
    price VARCHAR(50) NOT NULL ,
    category VARCHAR(150) NOT NULL 
    ); 