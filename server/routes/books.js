const express = require('express')
const router = express.Router()

const Book = require('../models/Books')

router.get('/test', (req, res) => res.send('book route testing is OK'))

router.get('/', (req, res) => {
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ notFound: 'No books found' }))
})

router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ notFound: 'No books found' }))
})


router.post('/', (req, res) => {
    Book.create(req.body)
      .then(book => res.json({ msg: 'Book added successfully' }))
      .catch(err => {
        console.log('err', err)
        res.status(400).json({ error: 'Unable to add this book' })
      })
    

})

router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
      .then(book => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
})

router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a book' }))
})

module.exports = router