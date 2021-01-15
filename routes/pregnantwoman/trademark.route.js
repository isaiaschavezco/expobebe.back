const express = require('express')
const router = express.Router()
const {
  createTrademark,
  deleteTrademark,
  getTrademark,
  updateTradeMark
} = require('../../controller/newlyborn/trademark.controller')

router.post('/', createTrademark)
router.get('/:tradeMarkId', getTrademark)
router.patch('/:tradeMarkId', updateTradeMark)
router.delete('/:tradeMarkId', deleteTrademark)

module.exports = router
