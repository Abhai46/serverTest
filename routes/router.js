const express = require('express')
const userController = require('../controller/userController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

const router = new express.Router()

//register : http://localhost:4000/register
router.post('/register',userController.registerController)

//login : http://localhost:4000/login
router.post('/login',userController.loginController)

//view all user
router.get('/viewalluser',jwtMiddleware,userController.viewController)

//single User Details
router.get('/viewsingleuser',jwtMiddleware,userController.singleUserController)


module.exports = router