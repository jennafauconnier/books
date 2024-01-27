require('dotenv').config()
const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const multer = require('multer');
const path = require('path');

router.get('/test', async (req, res) => {
  res.send('book route testing is OK');
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(404).json({ notFound: 'No books found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ notFound: 'No books found' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../config/uploads'));    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage : storage })


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, isbn, author, description, published_date, publisher, style } = req.body;
    const book = await Book.create({ title, isbn, author, description, published_date, publisher, style, image: req.file.filename });
    res.json({ book, msg: 'Book added successfully' });
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ error: 'Unable to add this book' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: 'Updated successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Unable to update the Database' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json({ mgs: 'Book entry deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'No such a book' });
  }
});

module.exports = router;