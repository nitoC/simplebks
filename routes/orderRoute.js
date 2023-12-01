const router = require('express').Router()
const { getOrderitem, deleteOrderItem } = require('../controller/orderController.js');
const Authorize = require('../middlewares/authorization.js');


router.get('/order_items', Authorize, getOrderitem)
router.delete('/order_items', Authorize, deleteOrderItem)


module.exports = router;