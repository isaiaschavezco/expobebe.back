/**
 * @Author: memo
 * @Date:   2020-09-21T12:38:45-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T13:22:41-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ChatSchemaNewlyBorn = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'EventsNewlyBorn'
  },

  rows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ChatRowsNewlyBorn'
    }
  ],

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date,
    default: Date.now
  }
})
const ChatSchemaPregnant = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'EventsPregnant'
  },

  rows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ChatRowsPregnant'
    }
  ],

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date,
    default: Date.now
  }
})
const ChatSchemaUnderThreeYears = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'EventsUnderThreeYears'
  },

  rows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ChatRowsUnderThreeYears'
    }
  ],

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date,
    default: Date.now
  }
})

const Chats = {
  ChatNewlyBorn: mongoose.model(
    'ChatsNewlyBorn',
    ChatSchemaNewlyBorn,
    'ChatsNewlyBorn'
  ),

  ChatPregnant: mongoose.model(
    'ChatsPregnant',
    ChatSchemaPregnant,
    'ChatsPregnant'
  ),

  ChatUnderThreeYears: mongoose.model(
    'ChatsUnderThreeYears',
    ChatSchemaUnderThreeYears,
    'ChatsUnderThreeYears'
  )
}

module.exports = Chats
