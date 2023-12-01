const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '240h' })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRETREFRESH, { expiresIn: '480h' })
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}