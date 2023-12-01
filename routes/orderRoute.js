const router = require('express').Router()
const { getOrder, deleteOrder } = require('../controller/orderController.js');
const Authorize = require('../middlewares/authorization.js');


router.get('/order_items', Authorize, getOrder)
router.delete('/order_items/:id', Authorize, deleteOrder)


module.exports = router;