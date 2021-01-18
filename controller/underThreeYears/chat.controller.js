const chatCtrl = {}
const mongoose = require('mongoose')
const status = require('../../codes/rest')

const {ChatUnderThreeYears} = require('../../models/joins/Chats')
const {EventUnderThreeYears} = require('../../models/Events')
const Users = require('../../models/Users')
const serviceGenerics = require('../../services/Generic')
const serviceChats = require('../../services/Chats')
const {ChatRowUnderThreeYears} = require('../../models/joins/ChatRows')


chatCtrl.createChat  = async (req, res)=> {
  try {
    if (!req.body.eventId) {
      return res.json({
        status: status.ID_INVALID_CREATE_CHAT
      })
    }

    const event = await serviceGenerics.read(EventUnderThreeYears, req.body.eventId)
    if (!event) {
      return res.json({
        status: status.ID_INVALID_CREATE_CHAT
      })
    }
    const filter = {
      eventId: mongoose.Types.ObjectId(req.body.eventId)
    }

    const chat = await serviceGenerics.upsert(ChatUnderThreeYears, filter, req.body)
    console.log('chat:', chat)
    return res.json({
      status: status.SUCCESS,
      result: {
        chat
      }
    })
  } catch (e) {
    console.log('Chat.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

chatCtrl.createComment =  async (req, res)=> {
  try {
    console.log('/comment/:chatId', req.params.chatId)
    console.log('')
    if (req.body.user == null || req.body.comment == null) {
      return res.json({
        status: status.ID_INVALID_CREATE_COMMENT
      })
    } else {
      var chat = await serviceGenerics.read(ChatUnderThreeYears, req.params.chatId)
      var user = await serviceGenerics.read(Users, req.body.user)
      if (chat == null || user == null) {
        return res.json({
          status: status.ID_INVALID_CREATE_COMMENT
        })
      } else {
        const message = await serviceGenerics.create('ChatRowUnderThreeYears', req.body)
        console.log('message:', message)
        // if(message){
        const chat = await serviceChats.pushRow(req.params.chatId, message._id,ChatRowUnderThreeYears)
        console.log('chat:', chat)
        // }
        return res.json({
          status: status.SUCCESS,
          result: {
            message
          }
        })
      }
    }
  } catch (e) {
    console.log('Chat.post.comment.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

chatCtrl.getEvent = async (req, res)=> {
  try {
    const chat = await serviceChats.getDetail(req.params.eventId,ChatRowUnderThreeYears)
    return res.json({
      status: status.SUCCESS,
      result: {
        chat
      }
    })
  } catch (e) {
    console.log('Chat.get.detail.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports  = chatCtrl