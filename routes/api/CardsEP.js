/**
 * @Author: Guillermo
 * @Date:   2020-08-26T17:09:07-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-08T21:55:08-05:00
 * @License: MIT
 */
 const express = require("express");
 const router = express.Router();
 const status  = require("../../codes/rest")
 const config = require("../../config/keys")
 const configWalmart = require("../../config/walmart")

 const serviceCards = require("../../services/Cards")
 const serviceWalmart = require("../../services/Walmart")
 const serviceUser = require("../../services/Users")
 const serviceProductos = require("../../services/Products")
 const serviceGenerics = require("../../services/Generic")
 const serviceUtilitites = require("../../services/Utilities")

 const Cards = require("./../../models/Cards")

 const URL_CREATE_CARD = configWalmart.SERVER_WALMART + configWalmart.URL_START_CARD
 const URL_ADD_ON_CARD = configWalmart.SERVER_WALMART + configWalmart.URL_ADD_ON_CARD
 const URL_COMPLETE_CARD = configWalmart.SERVER_WALMART + configWalmart.URL_COMPLETE_CARD


 router.get("/pagination/:skip",
  async (req, res) => {
    try {
      console.log("CardsEP.pagination:", req.query)
      var skip = req.params.skip || 1;
      var limit = parseInt(req.query.limit) || config.RES_PER_PAGE

      var filter = {}
      if(req.query.matchName){
        var users = await serviceUser.getIdsByFilter(req.query.matchName)
        console.log("users:", users)
        if(users){
          filter.user = {
            $in:users
          }
        }
      }

      if(req.query.status){
        filter.status = req.query.status
      }


      var cards = await serviceUser.getAllWithPagination(
         filter, skip, limit
      )

      console.log("filter:", filter)
      return res.json({
        status:status.SUCCESS,
        result:{
          cards
          }
        });
    } catch (err) {
      console.log("UtilitiesEP->getAllBanners.err:", err)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    } finally {

    }
 })


 router.get("/getAllCardsByUserId",
  // requireLogin,
  async (req, res) => {
    try {
      console.log("getAllCardsByUserId", req.query)
      var cards = await serviceCards.getAllCardsByUserId(req)
      return res.json({
        status:status.SUCCESS,
        result:{
          cards
          }
        });
    } catch (err) {
      console.log("UtilitiesEP->getAllBanners.err:", err)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    }
})

 router.post("/createCard",
  // requireLogin,
  async (req, res) => {
    try {
      if(req.body.user == null){
          return res.json({
            status:status.ID_INVALID_CREATE_CARD
          });
      }
      var user = await serviceUser.getById(req.body.user)
      if(user == null){
          return res.json({
            status:status.ERROR_SERVER_001
          });
      }else{
        var email = await serviceUtilitites.createDecipher(user.email)

        var response =await serviceWalmart.post(URL_CREATE_CARD, {
          email
        })
        console.log("response:", response)
      }
      var card = await serviceCards.createCard(req)
      return res.json({
        status:status.SUCCESS,
        result:{
          card
          }
        });
    } catch (err) {
      console.log("CardsEP->createCard.err:", err)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    } finally{


    }
})

 router.patch("/:cardId",
  // requireLogin,
  async (req, res) => {
    try {
      console.log("/PATCH req.params.cardId:", req.params.cardId)
      console.log("req.body:", req.body)
      var user = await serviceUser.getById(req.body.user)

      if(user == null){
          return res.json({
            status:status.ID_INVALID_PATCH_CARD
          });
      }
      var name = await serviceUtilitites.createDecipher(user.name)
      var email = await serviceUtilitites.createDecipher(user.email)
      var phoneNumber = await serviceUtilitites.createDecipher(user.phoneNumber)


      var cardOri = await serviceCards.findOneCard(req.params.cardId)
      var card = await serviceCards.patchCard(req.params.cardId, req)
      return res.json({
        status:status.SUCCESS,
        result:{
          card
          }
        });
    } catch (err) {
      console.log("UtilitiesEP->getAllBanners.err:", err)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    } finally{
      // envio del dato del sku de los juguetes en la carta
      if(req.body.products && req.body.products.length>0){
        var skus = []

        for (var i = 0; i < req.body.products.length; i++) {
          var prod = req.body.products[i]
          console.log("prod:", prod)
          if(prod){
            var product = await serviceProductos.findById(prod)
            if(product && user){
              var response = await serviceWalmart.post(URL_ADD_ON_CARD, {
                "email":email,
                "sku":product.sku
              })
              skus.push(product.sku)
              console.log("response["+i+"]:", response)
            }
          }
        }
        //envio de que ya termino la carta
        if(req.body.status == "SENDED" && user){
          var response = await serviceWalmart.post(URL_COMPLETE_CARD, {
            "email":email,
            skus
          })
        }
      }
    }
})

router.get("/getVideo",
 // requireLogin,
 async (req, res) => {
   try {
     if(req.query.name == null){
       return res.json({
         status:status.NAME_REQUIRED
         });
     }else{
       return res.json({
         status:status.SUCCESS_VIDEO,
         result:{
           videoURL:"https://www.youtube.com/watch?v=iRMGqTWqVuo"
           }
         });
     }

   } catch (err) {
     console.log("UtilitiesEP->getAllBanners.err:", err)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = err.message
     res.status(500).send({
         status:errorServer
     });
   }
})

module.exports = router;
