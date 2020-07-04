require("dotenv").config();
var jwt = require('jsonwebtoken');

module.exports = function generateToken(uuid, email, name){
    var token = jwt.sign({ uuid, email, name }, process.env.SECRET, {
        expiresIn: 600 // expires in 10min
    });
    return token;
}