require('dotenv').config()
const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const multer = require('multer');
const MulterGoogleStorage = require('multer-google-storage');
const path = require('path');
const admin = require("firebase-admin");
const sharp = require('sharp')


router.get('/test', async (req, res) => {
  res.send('book route testing is OK');
});

router.get('/', async (req, res) => {
    const books = await Book.find();
    const booksWithImageUrl = [];



    for (const book of books) {

      if(book.image === null || undefined) {
        return null
      }

      const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(book.image);
      const [url] = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });

      const bookWithImageUrl = {
        ...book._doc,
        image: url,
      };

      booksWithImageUrl.push(bookWithImageUrl);
    }

    res.json(booksWithImageUrl);
  
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const bookWithImageUrl = {
      ...book._doc,
      image: `https://storage.googleapis.com/books-543e4.appspot.com/${book.image}`, // Update with HTTP/HTTPS URL`, // Update with Firebase Storage URL
    };
    res.json(bookWithImageUrl);
  } catch (err) {
    res.status(404).json({ notFound: 'No books found' });
  }
});

const upload = multer();


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, isbn, author, description, published_date, publisher, style } = req.body;
    
    // Redimensionner et compresser l'image
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(136, 200)
      .jpeg({ quality: 80 }) // Compression JPEG avec qualité de 80
      .toBuffer();

    // Enregistrer l'image redimensionnée et compressée dans Firebase Storage
    const filename = Date.now().toString() + '-' + req.file.originalname;
    const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(filename);
    await fileRef.save(resizedImageBuffer);

    // Créer le livre avec le nom de fichier de l'image redimensionnée et compressée
    const book = await Book.create({ title, isbn, author, description, published_date, publisher, style, image: filename });
    
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

    const fileRef = admin.storage().bucket(process.env.BUCKET_NAME).file(book.image);
    await fileRef.delete();

    res.json({ mgs: 'Book entry deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'No such a book' });
  }
});

module.exports = router;