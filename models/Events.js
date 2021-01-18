/**
 * @Date:   2020-09-01T21:16:13-05:00
 * @Last modified time: 2020-09-21T13:10:33-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EventNewlyBornSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
  },

  date: {
    type: Date
    // required:[true, 'La fecha y hora del evento son requeridas.']
  },

  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },

  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },

  eventUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsNewlyBorn'
    }
  ],

  status: {
    type: String,
    enum: ['CREATED', 'ENDED', 'STREAMING', 'CANCELLED'],
    default: 'CREATED'
  },

  type: {
    type: String,
    enum: ['EVENT', 'CONTENT'],
    default: 'EVENT',
    required: [true, 'El tipo de evento es requerido.']
  },

  color: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date
  }
})

const EventPregnantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
  },

  date: {
    type: Date
    // required:[true, 'La fecha y hora del evento son requeridas.']
  },

  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },

  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },

  eventUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsPregnant'
    }
  ],

  status: {
    type: String,
    enum: ['CREATED', 'ENDED', 'STREAMING', 'CANCELLED'],
    default: 'CREATED'
  },

  type: {
    type: String,
    enum: ['EVENT', 'CONTENT'],
    default: 'EVENT',
    required: [true, 'El tipo de evento es requerido.']
  },

  color: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date
  }
})
const EventUnderThreeYearsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
  },

  date: {
    type: Date
    // required:[true, 'La fecha y hora del evento son requeridas.']
  },

  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },

  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },

  eventUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsUnderThreeYears'
    }
  ],

  status: {
    type: String,
    enum: ['CREATED', 'ENDED', 'STREAMING', 'CANCELLED'],
    default: 'CREATED'
  },

  type: {
    type: String,
    enum: ['EVENT', 'CONTENT'],
    default: 'EVENT',
    required: [true, 'El tipo de evento es requerido.']
  },

  color: {
    type: String
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },

  updatedDateMongo: {
    type: Date
  }
})

const Events = {
  EventNewlyBorn: mongoose.model(
    'EventsNewlyBorn',
    EventNewlyBornSchema,
    'EventsNewlyBorn'
  ),

  EventPregnant: mongoose.model(
    'EventsPregnant',
    EventPregnantSchema,
    'EventsPregnant'
  ),

  EventUnderThreeYears: mongoose.model(
    'EventsUnderThreeYears',
    EventUnderThreeYearsSchema,
    'EventsUnderThreeYears'
  )
}

module.exports = Events
