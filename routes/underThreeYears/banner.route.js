const express = require('express')
const router = express.Router()
const {
  createBanner,
  deleteBanner,
  updateBanner
} = require('../../controller/newlyborn/banner.controller')

router.post('/', createBanner)
router.delete('/:bannerId', deleteBanner)
router.patch('/:bannerId', updateBanner), (module.exports = router)
