const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {auth} = require('../middlewares/auth')

router.post('/auth/signup',userController.signUp)
router.post('/auth/login',userController.login)

router.use(auth)
router.get('/auth/dashboard',userController.dashboard)

module.exports = router