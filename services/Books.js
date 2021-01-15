
 const Books = require("./../models/Books")


 const mongoose = require("mongoose");

 module.exports = {
   getOne: async function(id,type){
     try {
        return type
         .findOne(
           {
             _id:mongoose.Types.ObjectId(id)
           }
         )
         .then(object=>{
           console.log("object:", object)
           if(object)
             return object
           else
             throw new Error("El registro no se encuentra. Revise sus datos.")
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
