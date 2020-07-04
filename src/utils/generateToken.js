require("dotenv").config();
var jwt = require('jsonwebtoken');

module.exports = function generateToken(uuid, email, name){
    var token = jwt.sign({ uuid, email, name }, process.env.SECRET, {
        expiresIn: "1d" // expires in one day
    });
    return token;
}