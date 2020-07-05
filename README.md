<h1 align="center">Example API Node Postgres</h1>

## Routes

Products:

/api/v1/products GET {name, description, category} query params
/api/v1/products POST -> To create a new product
/api/v1/products/:id PUT -> update an existing product
/api/v1/products/:id DELETE -> delete an existing product

Users:

/api/v1/users POST create a new user
/api/v1/login POST A user logs in generating a jwt
/api/v1/logout POST logging out of the system




