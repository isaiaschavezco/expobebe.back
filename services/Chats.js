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
       return type
            .findOne({
              eventId:mongoose.Types.ObjectId(id)
            })
            // .populate('rows rows.user eventId')
            .populate({
               path: 'rows eventId',
               options: {sort: {creationDateMongo: -1}},
               select: 'comment creationDateMongo urlThumbnail eventUrl status type name',
               populate: {
                 path: 'user',
                 model: 'users',
                 select:'name email'
               }
            })
            .then(chat=>{
              console.log("getDetail.chat:", chat)
              // return chat
              if(chat){
                  console.log()
                  console.log("chat.row:" + JSON.stringify(chat.rows))
                  console.log()
                  var resultArray = []
                  for (var i = 0; i < chat.rows.length; i++) {

                    var rowValue = chat.rows[i]
                    var user = {}
                    var userData = rowValue.user
                    console.log("rowValue["+i+"].user.name:", userData.name)
                    var decipher2 =  crypto.createDecipher(algorithm, key);
                    var decipheredName = decipher2.update(userData.name, outputEncoding, inputEncoding);
                    decipheredName += decipher2.final(inputEncoding);
                    console.log("decipheredName:"+decipheredName)
                    // chat.rows[i].user.name = decipheredName


                    var decipher3 =  crypto.createDecipher(algorithm, key);
                    var decipheredEmail = decipher3.update(userData.email, outputEncoding, inputEncoding);
                    decipheredEmail += decipher3.final(inputEncoding);
                    console.log("decipheredEmail:" + decipheredEmail)
                    // chat.rows[i].user.email = decipheredEmail

                    user = {
                      _id   : userData._id,
                      name  : decipheredName,
                      email : decipheredEmail
                    }

                    var newRow = {
                      user,
                      comment : rowValue.comment
                    }
                    console.log("newRow:" , newRow)
                    resultArray.push(newRow)
                  }
                  console.log()
                  console.log("resultArray:", resultArray)
                  console.log()
                  var newChat = chat
                  newChat.rows = resultArray
                  console.log("newChat:", newChat)
                  return {
                    _id:  chat._id,
                    rows: resultArray,
                    eventId: chat.eventId,
                    updatedDateMongo:chat.updatedDateMongo,
                    creationDateMongo:chat.creationDateMongo
                  }
                  return chat
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
