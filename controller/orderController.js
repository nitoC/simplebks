const { getUserBySellerId } = require("../services/auth");
const { getOrdersBySellerId } = require("../services/orders");


const Order = async (req, res) => {

    try {

        console.log(req.user, 'controller')
        let { limit, offset, sortBy } = req.query;
        let { seller } = req.user

        let userExist = await getUserBySellerId(seller)
        if (!userExist) {
            return res.status(401).json({ msg: "You are not a seller" })
        } else {
            console.log('here')
            let limitval = limit ? parseInt(limit) > 100 ? 100 : parseInt(limit) < 20 ? 20 : parseInt(limit) : parseInt(20)

            let orders = await getOrdersBySellerId(seller, limitval, sortBy, offset)

            res.status(200).json({
                data: orders.orderItems,
                total: orders.total,
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
        }

    } catch (err) {
        console.log("error in order", err);
        return res.status(500).json({ message: err.message })
    }


}

module.exports = Order