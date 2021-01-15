const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Subcategories = require('./Subcategories')

// Create Schema
const CategoryNewlyBornSchema = new Schema({
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
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubcategorysNewlyBorn'
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
const CategoryPregnantSchema = new Schema({
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
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubcategorysPregnant'
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
const CategoryUnderThreeYearsSchema = new Schema({
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
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubcategorysUnderThreeYears'
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
const Categorys = {
  CategoryNewlyBorn: mongoose.model(
    'CategorysNewlyBorn',
    CategoryNewlyBornSchema,
    'CategorysNewlyBorn'
  ),

  CategoryPregnant: mongoose.model(
    'CategorysPregnant',
    CategoryPregnantSchema,
    'CategorysPregnant'
  ),

  CategoryUnderThreeYears: mongoose.model(
    'CategorysUnderThreeYears',
    CategoryUnderThreeYearsSchema,
    'EventsUnderThreeYears'
  )
}
module.exports = Categorys
