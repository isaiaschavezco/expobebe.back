/**
 * @Author: Guillermo
 * @Date:   2020-08-25T19:04:04-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T14:08:42-05:00
 * @License: MIT
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CardNewlyBornSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El usuario es requerido']
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ],
  status: {
    type: String,
    enum: ['CREATED', 'LOADING', 'SENDED', 'CANCELED'],
    default: 'CREATED'
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const CardPregnantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El usuario es requerido']
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ],
  status: {
    type: String,
    enum: ['CREATED', 'LOADING', 'SENDED', 'CANCELED'],
    default: 'CREATED'
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})
const CardUnderThreeYearsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El usuario es requerido']
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ],
  status: {
    type: String,
    enum: ['CREATED', 'LOADING', 'SENDED', 'CANCELED'],
    default: 'CREATED'
  },
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
