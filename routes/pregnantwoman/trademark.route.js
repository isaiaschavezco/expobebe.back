const express = require('express')
const router = express.Router()
const {
  createTrademark,
  deleteTrademark,
  getTrademark,
  updateTradeMark
} = require('../../controller/pregnantwoman/trademark.controller')

router.get('/:tradeMarkId', getTrademark)
router.post('/', createTrademark)
router.patch('/:tradeMarkId', updateTradeMark)
router.delete('/:tradeMarkId', deleteTrademark)

module.exports = router
