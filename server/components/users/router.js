const express = require('express')

const controller = require('./controller')
const userRouter = express.Router()

userRouter.get('/', controller.retrieveUser)

userRouter.post('/signup', controller.signup)

userRouter.post('/signin', controller.signin)

module.exports = userRouter
