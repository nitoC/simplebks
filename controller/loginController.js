const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/jwt');
const { getUserBySellerId } = require('../services/auth');


const Login = async (req, res) => {

    try {
        let { username, password } = req.body;
        console.log(username, password)

        username = username.trim();
        password = parseInt(password);
        console.log(username, password)

        let user = await getUserBySellerId(username)
        console.log(user, 'second user')
        if (!user) {
            return res.status(404).send({ msg: "User not found" })
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