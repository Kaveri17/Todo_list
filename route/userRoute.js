const express = require('express')
const { register, login, forgetPassword, resetPassword } = require('../controllers/userController')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/forgetpassword',forgetPassword)
// router.post('/resetpassword',resetPassword)
module.exports = router