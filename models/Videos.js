/**
 * @Date:   2020-08-31T21:00:13-05:00
 * @Last modified time: 2020-09-01T11:58:35-05:00
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  videoURL: {
    type: String,
    required:true
  },
  type: {
    type: String,
    required:true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updatedDateMongo: {
    type: Date
  }
})

module.exports = Video = mongoose.model('videos', VideoSchema, 'Videos')
