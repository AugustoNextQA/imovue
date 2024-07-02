const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.USER_SECRET, {
        expiresIn: '1h'
    });
}

module.exports = generateToken;
