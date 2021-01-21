//No borrar estas importaciones ya que sí se usan
 const {TrademarkNewlyBorn,TrademarkPregnant,TrademarkUnderThreeYears} = require("./../models/joins/Trademarks")
 const Videos = require("./../models/Videos")
 const {EventNewlyBorn,EventPregnant,EventUnderThreeYears} = require("./../models/Events")
 const {BookNewlyBorn,BookPregnant,BookUnderThreeYears} = require("./../models/Books")
 const {ChatRowNewlyBorn,ChatRowPregnant,ChatRowUnderThreeYears} = require("./../models/joins/ChatRows")
 const Config = require("../models/Config")
 const utilitiesServices = require("./Utilities")
 const { DuplicateDataError, InternalError } = require('../models/errors/JuguetilandiaErrors');

 const mongoose = require("mongoose");

 module.exports = {

  create : async function(type, body){
    try {
      var objectToInsert = eval("new  "+ type + "("+
                                 JSON.stringify(body)
                                 +")")
       objectToInsert.creationDateMongo = new Date()
       return objectToInsert
        .save()
        .then(object=>{
          console.log("object:", object)
          return object
        })
        .catch(e=>{
          console.log("e:", e.message)
          if(e.message.toUpperCase().includes("DUPLICATE")){
            throw new DuplicateDataError(type)
          }else{
            throw new Error("MongoError->Generic.create.catch:"+ e.message)
          }        })
    } catch (e) {
      console.log("e:", e.message)
        if(e.message.toUpperCase().includes("DUPLICATE")){
          console.log("entro")
          throw new DuplicateDataError(type)
        }else{
          console.log("afuera")
          throw new Error("MongoError->Generic.create.catch:"+ e.message)
        }
    }
  },

  read : async function(type, id){
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
          throw new Error("MongoError->Generic.read:"+ e.message)
        })
    } catch (e) {
        console.log("e:", e)
        throw new Error("MongoError->Generic.create.catch:"+e.message)
    }
  },

  patch : async function(type, attributes, id){
    try {
       var filter = {
         _id:mongoose.Types.ObjectId(id)
       }
       attributes.updatedDateMongo = new Date()

       return type
       .findByIdAndUpdate(
         filter,
         attributes,
         {
           new:true,
           multi:true
         })
        .then(object=>{
          console.log("object:", object)
          return object
        })
        .catch(e=>{
          console.log("e:", e.message)
          throw new Error("MongoError->Generic.create:"+ e.message)
        })
    }catch(e){
        console.log("e:", e.message)
      throw new Error("MongoError->Generic.create.catch:"+ e.message)
    }
  },

  delete : async function(type, id){
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Please provide valid id.")
      }
      return type
            .deleteOne(
              {
                _id: mongoose.Types.ObjectId(id)
              }
            )
            .then(r=>{
              return r
            })
    } catch (e) {
      console.log("e")
        throw new Error("MongoError->Generic.delete:"+ e.message)
    }
  },

  deleteByFilter : async function(type, filter){
    try {
      if (filter==null) {
          throw new Error("Filtro inválido.")
      }
      return type
            .remove(
              filter
            )
            .then(r=>{
              return r
            })
    } catch (e) {
      console.log("e")
        throw new Error("MongoError->Generic.delete:"+ e.message)
    }
  },


  getAllWithPagination : async function(type, filter, skip, limit, sort){
    try {
      var filter2 = {
        skip:(limit * skip) - limit,
        limit:limit,
      }
      if(sort){
        filter2.sort = sort
      }
       return type
        .find(
          filter,
          {},
          filter2
        )
        .populate('user products')
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

  count : async function(type, filter){
    try {
       return type
        .find(filter)
        .count()
        .then(object=>{
          return object
        })
        .catch(e=>{
          throw new Error("MongoError->Generic.create:"+ e.message)
        })
    } catch (e) {
        console.log("e:", e)
        throw new Error("MongoError->Generic.create.catch:"+e.message)
    }
  },

  upsert : async function(type, filter, body){
    try {
        body.updatedDateMongo = new Date()
        return type
          .findOneAndUpdate(
            filter,
            body,
            {
              upsert: true,
              new: true
            }
          )
          .then( object => {
            console.log("Se ha creado algo", object);
            return object
          })
          .catch(e=>{
            throw new Error("MongoError->Generic.upsert:"+ e.message)
          })
    } catch (e) {
      console.log("e:", e)
      throw new Error("MongoError->Generic.upsert.catch:"+e.message)
    }
  },

  getTop10ByGame : async function(type, gameId) {
    try {
        return type.
                find(
                  {
                    gameId:mongoose.Types.ObjectId(gameId)
                  }
                )
                .populate({
                  path:'userId',
                  select:"email name phoneNumber"
                })
                .sort({score:-1})
                .limit(10)
                .then(scores=>{
                  return scores
                })
    } catch (e) {

    } finally {

    }
  },


  getAll : async function(type, id){
    try {
       return type
        .find()
        .then(object=>{
          return object
        })
        .catch(e=>{
          throw new Error("MongoError->Generic.getAll:"+ e.message)
        })
    } catch (e) {
        console.log("e:", e)
        throw new Error("MongoError->Generic.getAll.catch:"+e.message)
    }
  },


  findOne : async function(type, filter) {
    try {
        return type.
                findOne(
                  filter
                )
                .then(scores=>{
                  return scores
                })
    } catch (e) {

    } finally {

    }
  },

}
