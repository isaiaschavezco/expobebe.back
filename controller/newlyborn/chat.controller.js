const chatCtrl = {}
const mongoose = require('mongoose')
const status = require('../../codes/rest')

const {ChatNewlyBorn} = require('../../models/joins/Chats')
const {EventNewlyBorn} = require('../../models/Events')
const serviceGenerics = require('../../services/Generic')
const serviceChats = require('../../services/Chats')
const {ChatRowNewlyBorn} = require('../../models/joins/ChatRows')


chatCtrl.createChat  = async (req, res)=> {
    console.log("Creando chat born");
    
    try
    {
      const { eventId } = req.body.eventId
      console.log("Creando chat",req.body);
      if (req.body.eventId===null) {
        return res.json({
          status: status.ID_INVALID_CREATE_CHAT
        })
      }
      
      const event = await serviceGenerics.read(EventNewlyBorn, req.body.eventId)
      if (!event) {
        return res.json({
          status: status.ID_INVALID_CREATE_CHAT
      })
    }
    const filter = {
      eventId: mongoose.Types.ObjectId(req.body.eventId)
    }
    
    const chat = await serviceGenerics.upsert(ChatNewlyBorn, filter, req.body)
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
  console.log("Creando comentario born");
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
      const chat = await serviceGenerics.read(ChatNewlyBorn,chatId)
      if (!chat) {
        return res.json({
          status: status.ID_INVALID_CREATE_COMMENT
        })
      } else {
        const message = await serviceGenerics.create('ChatRowNewlyBorn', req.body)
        console.log('message:', message)
        const chat = await serviceChats.pushRow(chatId, message._id,ChatRowNewlyBorn)
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
  console.log("Obteniendo evento born");
  try
  {
    const chat = await serviceChats.getDetail(req.params.eventId,ChatRowNewlyBorn)
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