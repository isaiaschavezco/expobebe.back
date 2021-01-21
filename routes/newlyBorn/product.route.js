const express = require('express')
const router = express.Router()

const {
  createProduct,
  deleteProduct,
  filterByTrademark,
  getAllCategories,
  getAllTrademarks,
  getCombobox,
  getProduct,
  getProductsWithPagination,
  postExample,
  updateProduct
} = require('../../controller/newlyborn/product.controller')

router.post('/', createProduct)
router.get('/getAllTrademarks', getAllTrademarks)
router.get('/getAllCategories', getAllCategories)
router.get('/:productId', getProduct)
router.patch('/:productId', updateProduct),
router.delete('/:productId', deleteProduct)
router.get('/pagination/:skip', getProductsWithPagination)
router.get('/get/Combobox', getCombobox)
router.post('/postExample', postExample)
router.get('/filterByTrademark/:tradeMarkId', filterByTrademark)
module.exports = router
