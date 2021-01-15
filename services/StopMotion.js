/**
 * @Author: memo
 * @Date:   2020-09-22T16:09:25-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-07T22:28:36-05:00
 */
 const StopMotions = require("./../models/StopMotions")

 const mongoose = require("mongoose");
 const crypto = require('crypto');
 const keys = require("./../config/keys");

 var algorithm = keys.CRYPTP_ALGORITHM;
 var inputEncoding = keys.INPUT_ENCODING;
 var outputEncoding = keys.OUTPUT_ENCODING;
 var key = keys.CRYPTP_KEY;


 module.exports = {

   getAllWithPagination : async function(filter, skip, limit, sort){
     try {
       console.log("filter:", filter)
       var filter2 = {
         skip:(limit * skip) - limit,
         limit:limit,
       }
       if(sort){
         filter2.sort = sort
       }
        return StopMotions
         .find(
           filter,
           {},
           filter2
         )
         .populate({
           path:'user',
           select:{
             name:1,
             email:1
           }
         })
         .then(objects=>{
           var resultArray = []
           for (var i = 0; i < objects.length; i++) {
             var row = objects[i]
             var user = {}
             var userData = row.user
             console.log("row:", row)
             if(userData){
               var decipher = crypto.createDecipher(algorithm, key);
               var decipheredName = decipher.update(userData.name, outputEncoding, inputEncoding);
               decipheredName += decipher.final(inputEncoding);

               var decipher2 = crypto.createDecipher(algorithm, key);
               var decipheredEmail = decipher2.update(userData.email, outputEncoding, inputEncoding);
               decipheredEmail += decipher2.final(inputEncoding);


               user = {
                 name:decipheredName,
                 email:decipheredEmail
               }
               rowData = row
               rowData.user = user
               resultArray.push(rowData)
             }
           }
           return resultArray
         })
         .catch(e=>{
           throw new Error("MongoError->Generic.create:"+ e.message)
         })
     } catch (e) {
         console.log("e:", e)
         throw new Error("MongoError->Generic.create.catch:"+e.message)
     }
   },

 }
