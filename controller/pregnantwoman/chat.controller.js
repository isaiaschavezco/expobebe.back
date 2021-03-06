const chatCtrl = {}
const mongoose = require('mongoose')
const status = require('../../codes/rest')

const {ChatPregnant} = require('../../models/joins/Chats')
const {EventPregnant} = require('../../models/Events')
const serviceGenerics = require('../../services/Generic')
const serviceChats = require('../../services/Chats')
const {ChatRowPregnant} = require('../../models/joins/ChatRows')


chatCtrl.createChat  = async (req, res)=> {
  console.log("Creando chat pregned");
  try
  {
    const { eventId } = req.body.eventId
        console.log("Creando chat",req.body);

    if (req.body.eventId==="null") {
      return res.json({
        status: status.ID_INVALID_CREATE_CHAT
      })
    }

    const event = await serviceGenerics.read(EventPregnant, req.body.eventId)
    if (!event) {
      return res.json({
        status: status.ID_INVALID_CREATE_CHAT
      })
    }
    const filter = {
      eventId: mongoose.Types.ObjectId(req.body.eventId)
    }

    const chat = await serviceGenerics.upsert(ChatPregnant, filter, req.body)
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
  console.log("Creando comentario pregned");
  try
  {
    const chatId = req.params.chatId
    const {comment} = req.body 
    console.log('/comment/:chatId',chatId )

    if (!comment) {
      return res.json({
        status: status.ID_INVALID_CREATE_COMMENT
      })
    } else {
      const chat = await serviceGenerics.read(ChatPregnant,chatId)
      if (!chat) {
        return res.json({
          status: status.ID_INVALID_CREATE_COMMENT
        })
      } else {
        const message = await serviceGenerics.create('ChatRowPregnant', req.body)
        console.log('message:', message)
        const chat = await serviceChats.pushRow(chatId, message._id,ChatPregnant)
        console.log('chat:', chat)
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
  try
  {
    console.log("Obteniendo datos del evento pregned");
    const chat = await serviceChats.getDetail(req.params.eventId,ChatPregnant)
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