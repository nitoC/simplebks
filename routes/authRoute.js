const router = require('express').Router()
const login = require('../controller/loginController.js')


router.post('/login', login)


module.exports = router;