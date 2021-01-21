const videoCrl = {}
const express = require('express')
const passport = require('passport')
const router = express.Router()
const status = require('../codes/rest')
const config = require('../config/keys')
const serviceGenerics = require('../services/Generic')
const Videos = require('../models/Videos')
const Config = require('../models/Config')

const {
  DuplicateDataError,
  InternalError
} = require('../models/errors/JuguetilandiaErrors')


videoCrl.createVideo = async (req, res) => {
  try {
    const video = await serviceGenerics.create('Videos', req.body)

    return res.json({
      status: status.SUCCESS,
      result: {
        video
      }
    })
  } catch (e) {
    console.log('Videos.catch', e)
    if (e instanceof DuplicateDataError) {
      return res.json({
        status: status.DUPLICATE_DATA
      })
    } else {
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
        status: errorServer
      })
    }
  }
}


videoCrl.getAllByFilter = async (req, res) => {
  try {
    var skip = req.params.skip || 1
    var limit = parseInt(req.query.limit) || config.RES_PER_PAGE

    var filter = {}
    if (req.query.name) {
      let expression = new RegExp(`` + '^' + req.query.name + '$', 'i')
      filter.name = {
        $in: [expression]
      }

      // filter.name = req.query.name
    } else if (req.query.nickname) {
      
      let expression = new RegExp(`` + '^' + req.query.nickname + '$', 'i')

      filter.nicknames = {
        $in: [
          expression
        ]
      }
    }

    var videos = await serviceGenerics.getAllWithPagination(
      Videos,
      filter,
      skip,
      limit
    )
    console.log('videos.length:', videos.length)
    if (videos && videos.length > 0) {
      return res.json({
        status: status.SUCCESS,
        result: {
          videos
        }
      })
    } else {
      console.log('default')
      var videoDefault = await serviceGenerics.findOne(Config, {
        key: 'DEFAULT_VIDEO'
      })
      console.log('videoDefault:', videoDefault)
      return res.json({
        status: status.SUCCESS,
        result: {
          videos: [
            {
              name: 'DEFAULT',
              videoURL: videoDefault.value
            }
          ]
        }
      })
    }
  } catch (e) {}
}

videoCrl.getVideo = async (req, res) => {
  try {
    const video = await serviceGenerics.read(Videos, req.params.videoId)
    return res.json({
      status: status.SUCCESS,
      result: {
        video
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}



videoCrl.updateVideo = async (req, res) => {
  try {
    var attributes = {}
    if (req.body.name) attributes.name = req.body.name
    if (req.body.nicknames) attributes.nicknames = req.body.nicknames
    if (req.body.videoURL) attributes.videoURL = req.body.videoURL

    var video = await serviceGenerics.patch(
      Videos,
      attributes,
      req.params.videoId
    )

    return res.json({
      status: status.SUCCES_UPDATE,
      result: {
        video
      }
    })
  } catch (e) {
    console.log('Videos.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

videoCrl.deleteVideo = async (req, res) => {
  try {
    console.log('req.params.videoId:', req.params.videoId)
    if (req.params.videoId == null) {
      return res.json({
        status: status.ID_INVALID_GENERIC_001
      })
    } else {
      var result = await serviceGenerics.delete(Videos, req.params.videoId)
      console.log('result:', result)

      if (result && result.ok == 1 && result.n > 0) {
        var statusResp = status.SUCCESS_DELETE
        statusResp.detail = result.n

        return res.json({
          status: statusResp
        })
      } else {
        return res.json({
          status: status.ID_INVALID_GENERIC_002
        })
      }
    }
  } catch (e) {
    console.log('Videos.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports = videoCrl
