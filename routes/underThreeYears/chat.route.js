/**
 * @Author: memo
 * @Date:   2020-09-21T12:44:38-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T17:38:34-05:00
 */
const express = require('express')
const router = express.Router()
const {
  createChat,
  getEvent,
  createComment
} = require('../../controller/newlyborn/chat.controller')

router.post('/', createChat)
router.post('/:chatId/comment/', createComment)
router.get('/:eventId', getEvent)

module.exports = router
