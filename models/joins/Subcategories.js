/**
 * @Author: Guillermo
 * @Date:   2020-08-25T19:38:33-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   Guillermo
 * @Last modified time: 2020-08-26T13:08:00-05:00
 * @License: MIT
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const SubcategoryNewlyBornSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageURL: {
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
const SubcategoryPregnantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageURL: {
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
const SubcategoryUnderThreeYearsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageURL: {
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

const Subcategorys = {
  SubcategoryNewlyBorn: mongoose.model(
    'SubcategorysNewlyBorn',
    SubcategoryNewlyBornSchema,
    'SubcategorysNewlyBorn'
  ),

  SubcategoryPregnant: mongoose.model(
    'SubcategorysPregnant',
    SubcategoryPregnantSchema,
    'SubcategorysPregnant'
  ),

  SubcategoryUnderThreeYears: mongoose.model(
    'SubcategorysUnderThreeYears',
    SubcategoryUnderThreeYearsSchema,
    'EventsUnderThreeYears'
  )
}

module.exports = Subcategorys
