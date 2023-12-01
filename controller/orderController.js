const { getUserBySellerId } = require("../services/auth");


const Order = async (res, req) => {

    try {
        const { user } = req
        let { limit, offset, sortBy } = req.query;
        let { seller } = user

        let userExist = await getUserBySellerId(seller)
        if (!userExist) {
            return res.status(401).json({ msg: "You are not a seller" })
        } else {
            console.log('here')
        }

    } catch (err) {
        console.log("error in order", err);
    }


}

module.exports = Order