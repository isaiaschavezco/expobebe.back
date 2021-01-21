/**
 * @Author: memo
 * @Date:   2020-09-21T17:06:51-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-17T01:54:33-05:00
 */
 const {ChatNewlyBorn,ChatPregnant,ChatUnderThreeYears} = require("./../models/joins/Chats")
 const mongoose = require("mongoose");
 const keys = require("../config/keys");
 const crypto = require('crypto');
 var algorithm = keys.CRYPTP_ALGORITHM;
 var inputEncoding = keys.INPUT_ENCODING;
 var outputEncoding = keys.OUTPUT_ENCODING;
 var key = keys.CRYPTP_KEY;

 module.exports = {
   getDetail: async function(id,type){
     try {
       console.log("Id evento: ",id,type)
       let d = await type.findOne({
              eventId:id
       } )  
       console.log("Encnotrado?,",d);
       return type
            .findOne({
              eventId:mongoose.Types.ObjectId(id)
            })
            .populate({
               path: 'rows eventId',
               options: {sort: {creationDateMongo: -1}},
               select: 'comment creationDateMongo ',
            })
            .then(chat=>{
              console.log("getDetail.chat:", chat)
              if(chat){
                  console.log("chat.row:" + JSON.stringify(chat.rows))
                  let resultArray = []
                  for (var i = 0; i < chat.rows.length; i++) {
                    var rowValue = chat.rows[i]
                    const newRow = {
                      comment : rowValue.comment
                    }
                    resultArray.push(newRow)
                  }
                  console.log("resultArray:", resultArray)
                  const newChat = chat
                  newChat.rows = resultArray
                  console.log("newChat:", newChat)
                  return {
                    _id:  chat._id,
                    rows: resultArray,
                    eventId: chat.eventId,
                    updatedDateMongo:chat.updatedDateMongo,
                    creationDateMongo:chat.creationDateMongo
                  }
              }else{
                return chat
              }

            })
     } catch (e) {
       console.log("e:", e.message)
       throw new Error("MongoError->Chats.getDetail.catch:", e.message)
     }
   },

   pushRow: async function(chatId, rowId,type){
     try {
       return type
            .findOneAndUpdate(
              {"_id":chatId},
            {
              $push: {"rows": mongoose.Types.ObjectId(rowId)}
            },
           {safe: true, upsert: true, new: true}
          )
          .then(chat=>{
            return chat
          })
     } catch (e) {
       console.log("e:", e.message)
       throw new Error("MongoError->Chats.pushRow.catch:", e.message)
     }
   }
 }
