/**
 * @Author: memo
 * @Date:   2020-10-06T13:17:33-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-06T13:21:31-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ConfigSchema = new Schema({
  value: {
    type: String
  },
  key: {
    type: String
  }
})

module.exports = Card = mongoose.model('config', ConfigSchema, 'Config')
