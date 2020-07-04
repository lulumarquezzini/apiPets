const bcrypt = require('bcryptjs');

module.exports = function comparePassword(password, hash){
    return bcrypt.compareSync(password, hash);
}