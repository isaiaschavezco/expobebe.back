const express = require('express')
const passport = require('passport')
const router = express.Router()

const {
  createBook,
  deleteBook,
  getBook,
  getBooksByPagination,
  updateBook
} = require('../../controller/pregnantwoman/book.controller')

router.post('/', createBook)
router.get('/:bookId', getBook)
router.patch('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.get('/pagination/:skip', getBooksByPagination)

module.exports = router
