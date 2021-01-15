/**
 * @Author: Guillermo
 * @Date:   2020-08-31T11:47:18-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-09-18T17:28:04-05:00
 * @License: MIT
 */
 const express = require("express");
 const router = express.Router();
 const status  = require("../../codes/rest")
 const config = require("../../config/keys")
 const serviceGenerics = require("../../services/Generic")
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 const keys = require("../../config/keys");
 const Trademarks = require("./../../models/joins/Trademarks")


 router.get("/:tradeMarkId",
  async(req, res) => {
   try {
     var  trademark = await serviceGenerics.read(
       Trademarks, req.params.tradeMarkId)

     return res.json({
          status : status.SUCCESS,
          result : {
            trademark
          }})
   } catch (e) {
     console.log("Trademarks.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
 })

 router.post("/",

  async(req, res) => {
   try {
     var  trademark = await serviceGenerics.create(
       "Trademarks", req.body)

     return res.json({
          status : status.SUCCESS,
          result : {
            trademark
          }})
   } catch (e) {
     console.log("Trademarks.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
 })

 router.patch("/:tradeMarkId",
  async(req, res) => {
    try {
        var attributes = {}
        if(req.body.name) attributes.name = req.body.name
        if(req.body.imageURL) attributes.imageURL = req.body.imageURL
        if(req.body.color) attributes.color = req.body.color

        var trademark = await serviceGenerics.patch(
          Trademarks, attributes, req.params.tradeMarkId
        )
        return res.json({
             status : status.SUCCES_UPDATE,
             result : {
               trademarks:trademark
             }})
    } catch (e){
      console.log("Trademarks.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
 })


 router.delete("/:tradeMarkId",
  async(req, res) => {
    try {
      console.log("req.params.tradeMarkId:", req.params.tradeMarkId)
        if(req.params.tradeMarkId == null){
          return res.json({
            status:status.ID_INVALID_GENERIC_001
            });
        }else{
          var result = await serviceGenerics.delete(
            Trademarks,  req.params.tradeMarkId
          )
          console.log("result:", result)

          if(result && result.ok == 1 && result.n>0){
            var statusResp = status.SUCCESS_DELETE
            statusResp.detail = result.n

            return res.json({
                 status:statusResp
            })
          }else{
            return res.json({
                 status : status.ID_INVALID_GENERIC_002,
            })
          }
        }
    } catch (e){
      console.log("Trademarks.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  }
)

 module.exports = router;
