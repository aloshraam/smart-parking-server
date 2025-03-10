const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

// register router
router.post('/register',userController.registerController)

// login router
router.post('/login',userController.loginController)

module.exports = router