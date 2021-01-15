/**
 * @Date:   2020-09-01T22:09:26-05:00
 * @Last modified time: 2020-09-01T22:11:43-05:00
 */


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
         .populate('products')
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
