/**
 * @Author: Guillermo
 * @Date:   2020-08-26T17:09:42-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T14:16:29-05:00
 * @License: MIT
 */
 const Cards = require("../models/Cards");

 const mongoose = require("mongoose");

 module.exports = {

  getAllCardsByEmail : async function(req,typeCard,typeProduct){
      try {
        let filter = {
            email:mongoose.Types.ObjectId(req.query.email)
        }

        if(req.query.status != null){
          filter.status =  req.query.status
        }

        return typeCard
          .find(
              filter
          )
          .populate(
            {path: typeProduct, select: 'sku description name images'}
          )
          .then(cards=>{
            return cards
          })
      } catch (e) {
        console.log("e:", e.message)
        throw new Error("MongoError->Cards.createCard.catch:", e.message)
      }
  },

  createCard: async function(data,type){
    try {
      const NEW_CARD = new type({
        gender:data.gender,
        email:data.email,
        listItems:data.listItems,
      })
      return NEW_CARD
        .save()
        .then(card=>{
          return card
        })
        .catch(e=>{
          console.log("e:", e.message)
          throw new Error("MongoError->Cards.createCard.catch:", e.message)
        })
    } catch  (e) {
      throw new Error("MongoError->Cards.createCard.catch:", e.message)
    }
  },


  patchCard : async function(cardId, req,typeCard){
    try {
      let update = req.body

      return typeCard
        .findOneAndUpdate(
          {
            _id:cardId
          },
          update,
          {
             new: true
           }
        ).then(card=>{
          return card
        })
    } catch (e) {
      console.log("e:", e)
      throw new Error("MongoError:", e.message)
    }
  },


  findOneCard : async function(cardId){
    try {
      return Cards
        .findById(
          {
            _id:cardId
          }
        ).then(card=>{
          if(card)
            return card
          else
              throw new Error("Tu carta no ha sido encontrada.")
        })
    } catch (e) {
      console.log("e:", e)
      throw new Error("MongoError:", e.message)
    }
  },
}
