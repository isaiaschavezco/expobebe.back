/**
 * @Date:   2020-11-05T21:16:13-11:00
 * @Last modified time: 2020-11-05T13:10:33-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BookNewlyBornSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El name del video es requerido.']
  },
  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },
  videoUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const BookPregnantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El name del video es requerido.']
  },
  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },
  videoUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const BookUnderThreeYearsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El name del video es requerido.']
  },
  urlThumbnail: {
    type: String,
    required: [true, 'La url del thumbnail es requerida.']
  },
  videoUrl: {
    type: String,
    required: [true, 'La url del evento es requerida.']
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})

const Books = {
  BookNewlyBorn: mongoose.model(
    'BooksNewlyBorn',
    BookNewlyBornSchema,
    'BooksNewlyBorn'
  ),
  BookPregnant: mongoose.model(
    'BooksPregnant',
    BookPregnantSchema,
    'BooksPregnant'
  ),
  BookUnderThreeYears: mongoose.model(
    'BooksUnderThreeYears',
    BookUnderThreeYearsSchema,
    'BooksUnderThreeYears'
  )
}

module.exports = Books
