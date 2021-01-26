const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TrademarkNewlyBornSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  mnemonic: {
    type: String
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  },
  color: {
    type: String
  },
  order: {
    type: Number
  }
})
const TrademarkPregnantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  mnemonic: {
    type: String
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  },
  color: {
    type: String
  },
  order: {
    type: Number
  }
})
const TrademarkUnderThreeYearsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  mnemonic: {
    type: String
  },
  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  },
  color: {
    type: String
  },
  order: {
    type: Number
  }
})

const Trademarks = {
  TrademarkNewlyBorn: mongoose.model(
    'TrademarksNewlyBorn',
    TrademarkNewlyBornSchema,
    'TrademarksNewlyBorn'
  ),

  TrademarkPregnant: mongoose.model(
    'TrademarksPregnant',
    TrademarkPregnantSchema,
    'TrademarksPregnant'
  ),

  TrademarkUnderThreeYears: mongoose.model(
    'TrademarksUnderThreeYears',
    TrademarkUnderThreeYearsSchema,
    'TrademarksUnderThreeYears'
  )
}

module.exports = Trademarks
