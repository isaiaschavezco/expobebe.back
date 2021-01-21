/**
 * @Author: Guillermo
 * @Date:   2020-08-25T19:04:04-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-06T17:27:52-05:00
 * @License: MIT
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProductNewlyBornSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
    // uppercase : true
  },
  sku: {
    type: String,
    required: [true, 'El SKU es requerido.']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String
  },
  trademarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TrademarksNewlyBorn'
      // required: [true,'La marca es requerida.']
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CategorysNewlyBorn'
    }
  ],

  shopUrl: {
    type: String
    // required: [true,'El url de compra es requerido.']
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  urlThumbnail: {
    type: String
  },
  youtubeURL: {
    type: String
  },
  updatedDateMongo: {
    type: Date
  }
})
const ProductPregnantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
    // uppercase : true
  },
  sku: {
    type: String,
    required: [true, 'El SKU es requerido.']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String
  },
  trademarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TrademarksPregnant'
      // required: [true,'La marca es requerida.']
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CategorysPregnant'
    }
  ],

  shopUrl: {
    type: String
    // required: [true,'El url de compra es requerido.']
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  urlThumbnail: {
    type: String
  },
  youtubeURL: {
    type: String
  },
  updatedDateMongo: {
    type: Date
  }
})
const ProductUnderThreeYearsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.']
    // uppercase : true
  },
  sku: {
    type: String,
    required: [true, 'El SKU es requerido.']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida.']
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String
  },
  trademarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TrademarksUnderThreeYears'
      // required: [true,'La marca es requerida.']
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CategorysUnderThreeYears'
    }
  ],

  shopUrl: {
    type: String
    // required: [true,'El url de compra es requerido.']
  },

  creationDateMongo: {
    type: Date,
    default: Date.now
  },
  urlThumbnail: {
    type: String
  },
  youtubeURL: {
    type: String
  },
  updatedDateMongo: {
    type: Date
  }
})

//  ProductSchema.post('save', function (error, doc, next) {
//     if (err.name === 'BulkWriteError' && error.code === 11000)
//         next(new Error('This item already exists, please try again'));
//     else next(error);
// });

const Products = {
  ProductNewlyBorn: mongoose.model(
    'ProductsNewlyBorn',
    ProductNewlyBornSchema,
    'ProductsNewlyBorn'
  ),

  ProductPregnant: mongoose.model(
    'ProductsPregnant',
    ProductPregnantSchema,
    'ProductsPregnant'
  ),

  ProductUnderThreeYears: mongoose.model(
    'ProductsUnderThreeYears',
    ProductUnderThreeYearsSchema,
    'ProductsUnderThreeYears'
  )
}

module.exports = Products
