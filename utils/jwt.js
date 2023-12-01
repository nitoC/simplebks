const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '6h' })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRETREFRESH, { expiresIn: '12h' })
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}