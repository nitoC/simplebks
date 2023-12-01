const { getUserBySellerId } = require("../services/auth");
const { getOrdersBySellerId, deleteOrderById } = require("../services/orders");


const getOrder = async (req, res) => {

    try {

        console.log(req.user, 'controller')
        let { limit, offset, sortBy } = req.query;
        let { seller } = req.user

        let userExist = await getUserBySellerId(seller)
        if (!userExist) {
            return res.status(401).json({ message: "You are not a seller" })
        } else {
            console.log('here')
            let limitval = limit ? parseInt(limit) > 100 ? 100 : parseInt(limit) < 20 ? 20 : parseInt(limit) : parseInt(20)

            let orders = await getOrdersBySellerId(seller, limitval, sortBy, parseInt(offset))

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


const deleteOrder = async (req, res) => {
    try {
        //console.log(req.body, 'delete order item controller');
        console.log(req, 'check params')
        let { id } = req.params;
        let { seller } = req.user

        let userExist = await getUserBySellerId(seller)

        if (!userExist) {
            return res.status(401).json({ message: "You are not a seller" })
        } else {
            let deleted = await deleteOrderById(seller, id)
            if (!deleted) {
                throw new Error("Error deleting the Order")

            } else {
                return res.status(200).json({ message: "Deletion Successful", data: deleted })
            }
        }
    } catch (err) {
        console.log("error in order", err);
        return res.status(500).json({ message: err.message })
    }



}

module.exports = {
    getOrder,
    deleteOrder
}