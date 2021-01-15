/**
 * @Author: memo
 * @Date:   2020-09-21T12:38:45-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T15:23:13-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ChatRowNewlyBornSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El identificador de usuario es requerido.']
  },
  comment: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  }
})
const ChatRowPregnantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El identificador de usuario es requerido.']
  },

  comment: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  }
})
const ChatRowUnderThreeYearsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El identificador de usuario es requerido.']
  },

  comment: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  }
})

const ChatRows = {
  ChatRowNewlyBorn: mongoose.model(
    'ChatRowsNewlyBorn',
    ChatRowNewlyBornSchema,
    'ChatRowsNewlyBorn'
  ),

  ChatRowPregnant: mongoose.model(
    'ChatRowsPregnant',
    ChatRowPregnantSchema,
    'ChatRowsPregnant'
  ),

  ChatRowUnderThreeYears: mongoose.model(
    'ChatRowsUnderThreeYears',
    ChatRowUnderThreeYearsSchema,
    'ChatRowsUnderThreeYears'
  )
}

module.exports = ChatRows
