# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]
- 

## Data Shapes
#### Product
- id uuid DEFAULT uuid_generate_v4() PRIMARY KEY
- name VARCHAR(150) UNIQUE
- price VARCHAR(50) NOT NULL
- category VARCHAR(150) NOT NULL

#### User
- id uuid DEFAULT uuid_generate_v4() PRIMARY KEY
- email VARCHAR(50) UNIQUE
- user_name VARCHAR(50) NOT NULL
- first_name VARCHAR(50) NOT NULL
- last_name VARCHAR(50) NOT NULL
- password VARCHAR(255) NOT NULL

#### Orders
- id uuid DEFAULT uuid_generate_v4() PRIMARY KEY
- user_id uuid REFERENCES users(id) NOT NULL
- status status NOT NULL
- CONSTRAINT check_types CHECK (status = 'active' OR status = 'complete')

