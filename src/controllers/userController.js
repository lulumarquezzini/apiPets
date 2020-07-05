const dbQuery  = require('../db/dbQuery');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');

const registerUser = async (request, response) => {
    const { email, name, password } = request.body;
    const uuid = uuidv4();
    const hashedPass = hashPassword(password);
  
    const userQuery = 'INSERT into users (uuid, email, name, password) VALUES ($1, $2, $3, $4)';
    const values = [ uuid, email, name, hashedPass ];

    try {
        await dbQuery.query(userQuery, values);
        const token = generateToken(uuid, email, name);
        const message = { status: 'success', message: 'User Registered!', token: token};
        return response.status(201).send(message);
      } catch (error) {
        return response.status(500).send({status: error.statusCode, error: error.message});
      }
}

const login = async(request, response) => {
    const { email, password } = request.body;
    const loginQuery = 'SELECT * from users where email = $1';
    const value = [ email ];
    try{
        const { rows } = await dbQuery.query(loginQuery, value);
        if (rows.length == 0){
            return response.status(401).send({status: 'error', message: 'Your e-mail is not registered!'});
        }
        const hashedpass = rows[0].password;
        const token = generateToken(rows[0].uuid, rows[0].email, rows[0].name);
        if(comparePassword(password, hashedpass)){
            return response.status(200).send({status: 'success', message: 'Login successful!', token: token});
        }
        else {
            return response.status(401).send({status: 'error', message: 'Wrong password!'});
        }

    } catch (error) {
        return response.status(500).send({status: 'error', error: error.message});
    }

}

const logout = async(response) => {
    return response.status(200).send({status: 'success', message: 'Logout successful!', token: null});
}


module.exports = {
    registerUser,
    login,
    logout
};