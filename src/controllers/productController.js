const dbQuery  = require('../db/dbQuery');
const { v4: uuidv4 } = require('uuid');

const create = async (request, response) => {
    const { name, description, category, price, stock } = request.body;
    const uuid = uuidv4();
    const productQuery = 'INSERT into products (uuid, name, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [ uuid, name, description, category, price, stock ];

    try {
        await dbQuery.query(productQuery, values);
        const message = { status: 'success', message: 'Product created!'};
        return response.status(201).send(message);
      } catch (error) {
        return response.status(500).send({status: error.statusCode, error: error.message});
      }
}

const update = async (request, response) => {
  const uuid = request.params.id;
  const { name, description, category, price, stock } = request.body;
  const productQuery = 'UPDATE products SET name = $1, description = $2, category = $3, price = $4, stock = $5 WHERE uuid = $6';
  const values = [ name, description, category, price, stock, uuid ];

  try {
      await dbQuery.query(productQuery, values);
      const message = { status: 'success', message: 'Product updated!'};
      return response.status(201).send(message);
    } catch (error) {
      return response.status(500).send({status: error.statusCode, error: error.message});
    }
}

const destroy = async (request, response) => {
  const uuid = request.params.id

  const productQuery = 'DELETE FROM products WHERE uuid = $1';
  const value = [ uuid ];

  try {
    await dbQuery.query(productQuery, value);
    const message = { status: 'success', message: 'Product deleted!'};
    return response.status(201).send(message);
  } catch (error) {
    return response.status(500).send({status: error.statusCode, error: error.message});
  }

}


module.exports = {
    create,
    update,
    destroy
};