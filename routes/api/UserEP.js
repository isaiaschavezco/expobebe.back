const express = require('express')
const router = express.Router()

const {
  sendEmailCode,
  validateUser,
  createUser,
  login,
  recoverPassword
} = require('../../controller/user.controller')

router.post('/login', login)
router.post('/register', createUser)
// router.post('/recovery', recoverPassword)
// router.post('/sendEmail4Code', sendEmailCode)
// router.post('/validate', validateUser)

module.exports = router
