const express = require('express')
const passport = require('passport')
const router = express.Router()
const requireLogin = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/api/error'
})
const {
  createEvent,
  deleteEvent,
  getEvent,
  getEventWithPagination,
  updateEvent
} = require('../../controller/pregnantwoman/event.controller')

router.post('/', createEvent)
router.get('/:eventId', getEvent)
router.patch('/:eventId', updateEvent)
router.delete('/:eventId', deleteEvent)
router.get('/pagination/:skip', getEventWithPagination)

module.exports = router
