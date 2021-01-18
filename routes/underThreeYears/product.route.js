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
} = require('../../controller/underThreeYears/product.controller')

router.get('/getAllTrademarks', getAllTrademarks)
router.get('/getAllCategories', getAllCategories)
router.get('/pagination/:skip', getProductsWithPagination)
router.get('/:productId', getProduct)
router.post('/', createProduct)
router.patch('/:productId', updateProduct),
router.delete('/:productId', deleteProduct)
router.get('/get/Combobox', getCombobox)
router.post('/postExample', postExample)
router.get('/filterByTrademark/:tradeMarkId', filterByTrademark)
module.exports = router
