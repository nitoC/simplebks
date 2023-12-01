const router = require('express').Router()
const UpdateAccount = require('../controller/accountController.js');
const Authorize = require('../middlewares/authorization.js');

router.patch('/account', Authorize, UpdateAccount)

module.exports = router;