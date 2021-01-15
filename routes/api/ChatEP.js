/**
 * @Author: memo
 * @Date:   2020-09-21T12:44:38-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T17:38:34-05:00
 */
 const express = require("express");
 const router = express.Router();
 const mongoose = require("mongoose");
 const status  = require("../../codes/rest")

 const Chats = require("./../../models/joins/Chats")
 const Events = require("./../../models/Events")
 const Users = require("./../../models/Users")
 const ChatsRow = require("./../../models/joins/ChatRows")
 const serviceGenerics = require("../../services/Generic")
 const serviceChats = require("../../services/Chats")

 router.post("/",
  async(req, res) => {
    try {
      if(!req.body.eventId){
        return res.json({
          status: status.ID_INVALID_CREATE_CHAT
        });
      }

      var event = await serviceGenerics.read(Events, req.body.eventId)
      if(!event){
        return res.json({
          status: status.ID_INVALID_CREATE_CHAT
        });
      }
      var filter = {
        eventId: mongoose.Types.ObjectId(req.body.eventId)
      }

      var  chat = await serviceGenerics.upsert(
        Chats, filter, req.body)
      console.log("chat:", chat)
      return res.json({
           status : status.SUCCESS,
           result : {
             chat
           }})
    } catch (e) {
      console.log("Chat.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  })

  router.post("/:chatId/comment/",
    async(req, res) => {
      try {
        console.log("/comment/:chatId", req.params.chatId)
        console.log("")
        if(req.body.user == null || req.body.comment == null){
          return res.json({
            status: status.ID_INVALID_CREATE_COMMENT
          });
        }else{
          var chat = await serviceGenerics.read(Chats, req.params.chatId)
          var user = await serviceGenerics.read(Users, req.body.user)
          if(chat==null || user==null ){
            return res.json({
              status: status.ID_INVALID_CREATE_COMMENT
            });
          }else{
            var message = await serviceGenerics.create("ChatsRow", req.body)
            console.log("message:", message)
            // if(message){
                var chat = await serviceChats.pushRow(req.params.chatId, message._id)
            console.log("chat:", chat)
            // }
            return res.json({
                 status : status.SUCCESS,
                 result : {
                   message
                 }})
          }
        }
      } catch (e) {
        console.log("Chat.post.comment.catch", e)
        var errorServer = status.ERROR_SERVER
        errorServer.detail = e.message
        res.status(500).send({
            status:errorServer
        });
      }
  })

  router.get("/:eventId",
   async(req, res) => {
     try {
       var chat = await serviceChats.getDetail(req.params.eventId)
       return res.json({
            status : status.SUCCESS,
            result : {
              chat
            }})
     } catch (e) {
       console.log("Chat.get.detail.catch", e)
       var errorServer = status.ERROR_SERVER
       errorServer.detail = e.message
       res.status(500).send({
           status:errorServer
       });
     }
  });

  module.exports = router;
