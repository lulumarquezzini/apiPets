require("dotenv").config();
var jwt = require('jsonwebtoken');

module.exports = function checkToken(request, response, next){
    var token = request.headers['token'];
    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // Saving user
      request.user = {
        uuid: decoded.uuid,
        email: decoded.email,
        name: decoded.name
      };
      next();
    });
}