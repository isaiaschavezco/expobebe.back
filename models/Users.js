
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  phoneNumber: {
    type: String,
    required: [true, 'El teléfono es requerido.']
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  isValidated: {
    type: Boolean
  },
  verificationCode: {
    type: String
  },
  dateConfirmation: {
    type: Date
  }
})

module.exports = User = mongoose.model('users', UserSchema, 'Users')
