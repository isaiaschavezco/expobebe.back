const express = require('express')
const router = express.Router()
const {
  createVideo,
  deleteVideo,
  getAllByFilter,
  getVideo,
  updateVideo
} = require( '../../controller/video.controller')

router.get('/getAllByFilter/:skip', getAllByFilter)
router.get('/:videoId', getVideo)
router.patch('/:videoId', updateVideo)
router.post('/', createVideo)
router.delete('/:videoId', deleteVideo)
module.exports = router
