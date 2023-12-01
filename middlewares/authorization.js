const jwt = require('jsonwebtoken')



const Authorize = (req, res, next) => {
    const { authorization } = req.headers

    try {

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Invalid or missing Authorization header.' });
        }

        let token = authorization.split(" ")[1];

        let authorized = jwt.verify(token, process.env.SECRETKEY)
        console.log(authorized, 'authorised')

        if (!authorized) {
            return res.status(400).json({ message: "invalid user token" })
        }

        console.log(authorized, ' authorized')
        req.user = authorized
        next()

    } catch (err) {
        console.log(err.message)
        console.log(err.name)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'invalid user token' })
        }
        return res.status(500).json({ message: err.message })
    }
}

module.exports = Authorize;