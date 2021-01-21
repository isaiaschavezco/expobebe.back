const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {NEWLYBORN,PREGNED,UNDER} = require('../codes/types')

// Create Schema
const CardNewlyBornSchema = new Schema({
  email: {
    type: String,
    required: [true, 'El email es requerido']
  },
  gender: {
    type: String,
    required: [true, 'El género es requerido']
  },
  listItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsNewlyBorn'
    }
  ],
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const CardPregnantSchema = new Schema({
 email: {
    type: String ,
    required: [true, 'El email es requerido']
  },
  gender: {
    type: String ,
    required: [true, 'El género es requerido']
  },
  listItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsPregnant'
    }
  ],
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const CardUnderThreeYearsSchema = new Schema({
  email: {
    type: String ,
    required: [true, 'El email es requerido']
  },
  gender: {
    type: String ,
    required: [true, 'El género es requerido']
  },
  listItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductsUnderThreeYears'
    }
  ],
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})

const Cards = {
  CardNewlyBorn: mongoose.model(
    'CardsNewlyBorn',
    CardNewlyBornSchema,
    'CardsNewlyBorn'
  ),

  CardPregnant: mongoose.model(
    'CardsPregnant',
    CardPregnantSchema,
    'CardsPregnant'
  ),

  CardUnderThreeYears: mongoose.model(
    'CardsUnderThreeYears',
    CardUnderThreeYearsSchema,
    'CardsUnderThreeYears'
  )
}

module.exports = Cards
