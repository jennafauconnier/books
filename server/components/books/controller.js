require('dotenv').config()
const express = require('express')
const Book = require('../../models/Books')
const jwt = require('jsonwebtoken')
const admin = require("firebase-admin")
const sharp = require('sharp')

const retrieveBooks = async(req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Token non fourni' })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.user.id

        const books = await Book.find({ user: userId })

        const booksWithImageUrl = await Promise.all(books.map(async (book) => {
        const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(book.image)
        const [url] = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' })

            return {
                ...book._doc,
                image: url,
            }
            }))

        res.status(200).json(booksWithImageUrl)
        
    } catch (err) {
        res.status(500).send(err)
    }
}

const retrieveBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        const bookWithImageUrl = {
          ...book._doc,
          image: `https://storage.googleapis.com/books-543e4.appspot.com/${book.image}`,
        }
        res.status(201).json(bookWithImageUrl)
      } catch (err) {
        res.status(404).json({ notFound: 'No books found' })
      }
}

const addBook = async(req, res) => {
    try {
        const { user, title, isbn, author, description, published_date, publisher, style } = req.body
    
        const resizedImageBuffer = await sharp(req.file.buffer)
          .resize(136, 200)
          .jpeg({ quality: 80 }) 
          .toBuffer()
    
        const filename = Date.now().toString() + '-' + req.file.originalname
        const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(filename)
        await fileRef.save(resizedImageBuffer)

        const book = await Book.create({ user, title, isbn, author, description, published_date, publisher, style, image: filename })
    
        res.status(200).json({ book, msg: 'Book added successfully' })
      } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Unable to add this book' })
      }
}

const updateBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.status(203).json({ book, msg: 'Updated successfully' })
    } catch (err) {
        res.status(400).json({ error: 'Unable to update the Database' })
    }
}

const deleteBook = async(req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id)
    
        const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(book.image)
        await fileRef.delete()
    
        res.status(201).json({ mgs: 'Book entry deleted successfully' })
      } catch (err) {
        res.status(404).json({ error: 'No such a book' })
      }
}

module.exports = {
    retrieveBooks,
    retrieveBook,
    addBook,
    updateBook,
    deleteBook
}