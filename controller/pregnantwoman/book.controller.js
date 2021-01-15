const bookCrl = {}
const passport = require('passport')
const status = require('../../codes/rest')
const serviceBooks = require('../../services/Books')
const serviceGenerics = require('../../services/Generic')
const serviceUtilities = require('../../services/Utilities')

const { BookPregnant } = require('./../../models/Books')

// const requireLogin = passport.authenticate('jwt', {
//   session: false,
//   failureRedirect: '/api/error'
// })

bookCrl.createBook = async (req, res) => {
  try {
    let params = req.body
    let libro = await serviceGenerics.create('BookPregnant', params)

    return res.json({
      status: status.SUCCESS,
      result: {
        book: libro
      }
    })
  } catch (e) {
    console.log('books.catch', e)
    let errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}
// requireLogin,
bookCrl.getBook = async (req, res) => {
  try {
    let libro = await serviceBooks.getOne(req.params.bookId, BookPregnant)

    return res.json({
      status: status.SUCCESS,
      result: {
        book: libro
      }
    })
  } catch (err) {
    let errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

bookCrl.updateBook = async (req, res) => {
  try {
    console.log('/:bookId->', req.body)
    let attributes = {}
    if (req.body.name) {
      attributes.name = req.body.name
    }
    if (req.body.urlThumbnail) {
      attributes.urlThumbnail = req.body.urlThumbnail
    }
    if (req.body.videoUrl) {
      attributes.videoUrl = req.body.videoUrl
    }

    console.log('PATCH->attributes:', attributes)
    let book = await serviceGenerics.patch(
      BookPregnant,
      attributes,
      req.params.bookId
    )

    return res.json({
      status: status.SUCCES_UPDATE,
      result: {
        book
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

bookCrl.deleteBook = async (req, res) => {
  try {
    if (req.params.bookId === null) {
      return res.json({
        status: status.ID_INVALID_GENERIC_001
      })
    } else {
      let result = await serviceGenerics.delete(
        BookPregnant,
        req.params.bookId
      )
      console.log('result:', result)

      if (result && result.ok == 1 && result.n > 0) {
        var statusResp = status.SUCCESS_DELETE
        statusResp.detail = result.n

        return res.json({
          status: statusResp
        })
      } else {
        return res.json({
          status: status.ID_INVALID_GENERIC_002
        })
      }
    }
  } catch (e) {
    console.log('BookPregnant.catch', e)
    let errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}
bookCrl.getBooksByPagination = async (req, res) => {
  console.log('/pagination')
  console.log('req.query:', req.query)
  try {
    const books = await serviceUtilities.getAllBooks(BookPregnant)
    return res.json({
      status: status.SUCCESS,
      result: {
        books
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports = bookCrl
