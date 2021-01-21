/**
 * @Author: memo
 * @Date:   2020-09-22T16:21:07-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-25T18:52:18-05:00
 */
const mongoose = require("mongoose");
const Users = require("./../models/Users")
const Cards = require("./../models/Cards")

module.exports = {
  getAllWithPagination : async function(filter, skip, limit,typeCard,typeProduct){
    try {
      // let filter2 = {
        // skip:(limit * skip) - limit,
        // limit:limit,
      // }
       return typeCard
        .find(
          filter
        )
        .populate(typeProduct)
        .then(objects=>{
          return objects
        })
        .catch(e=>{
          throw new Error("MongoError->Generic.create:"+ e.message)
        })
    } catch (e) {
        console.log("e:", e)
        throw new Error("MongoError->Generic.create.catch:"+e.message)
    }
  },

   getIdsByFilter : async function(name){
     try {
       return Users
              .find(
                { "name": { "$regex": name, "$options": "i" } },
              )
              .distinct('_id')
              .then(users=>{
                return users
              })
              .catch(e=>{
                throw new Error("MongoError->Generic.create:"+ e.message)
              })
          } catch (e) {
              console.log("e:", e)
              throw new Error("MongoError->Generic.create.catch:"+e.message)
          }
   },

   getById : async function(id){
     try {
       return Users
              .findOne(
                {
                  _id:mongoose.Types.ObjectId(id)
                }
              )
              .then(user=>{
                return user
              })
              .catch(e=>{
                throw new Error("MongoError->Generic.create:"+ e.message)
              })
          } catch (e) {
              console.log("e:", e)
              throw new Error("MongoError->Generic.create.catch:"+e.message)
          }
   }

}
