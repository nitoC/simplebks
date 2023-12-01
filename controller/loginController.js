const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/jwt');
const { getUserBySellerId } = require('../services/auth');


const Login = async (req, res) => {

    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Bad request' })
        }

        username = username.trim();
        password = parseInt(password);

        let user = await getUserBySellerId(username)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        } else {
            // Create a token
            if (user.seller_zip_code_prefix !== password) {
                return res.status(401).json({ message: 'User password is incorrect' })
            }
            const payload = {
                id: user._id,
                seller: user.seller_id,
            };

            var token = generateAccessToken(payload)
            return res.status(200).json({ message: "Login Successful!", token: token })
        }
    } catch (err) {
        return res.status(500).send({ msg: err.message || 'Error on login' })
    }


}

module.exports = Login