/* Replace with your SQL commands */

    DROP TYPE IF EXISTS status CASCADE;
CREATE TYPE status AS ENUM ('active', 'complete') ;
CREATE TABLE IF NOT EXISTS orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(id) NOT NULL,
    status status NOT NULL ,
    CONSTRAINT check_types CHECK (status = 'active' OR status = 'complete') 
);