const { pool } = require('./pool');

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Users Table
 */
const createUsersTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (uuid uuid PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    name VARCHAR(100), 
    password VARCHAR(100) NOT NULL)`;
  
    pool.query(userCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

/**
 * Create Products Table
 */
const createProductsTable = () => {
    const productCreateQuery = `CREATE TABLE IF NOT EXISTS products
      (uuid uuid PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price VARCHAR(10) NOT NULL,
      stock integer NOT NULL)`;
  
    pool.query(productCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

  /**
 * Drop User Table
 */
const dropUsersTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

/**
 * Drop Products Table
*/
const dropProductsTable = () => {
    const productsDropQuery = 'DROP TABLE IF EXISTS products';
    pool.query(productsDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

const createAllTables = () => {
    createUsersTable();
    createProductsTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUsersTable();
    dropProductsTable();
};
  
pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTables,
    dropAllTables,
};

require('make-runnable');