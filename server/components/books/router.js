const express = require('express')
const multer = require('multer')

const controller = require('./controller')

const bookRouter = express.Router()
const upload = multer()

bookRouter.get('/', controller.retrieveBooks)

bookRouter.get('/:id', controller.retrieveBook)

bookRouter.post('/', upload.single('image'), controller.addBook)

bookRouter.put('/:id', controller.updateBook)

bookRouter.delete('/:id', controller.deleteBook)

module.exports = bookRouter
