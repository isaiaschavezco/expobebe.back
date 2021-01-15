/**
 * @Date:   2020-09-01T21:51:47-05:00
 * @Last modified time: 2020-10-02T19:45:28-05:00
 */

  const express = require("express");
  const passport = require("passport");
  const router = express.Router();
  const status  = require("../../codes/rest")
  const config = require("../../config/keys")
  const serviceEvents = require("../../services/Events")
  const serviceGenerics = require("../../services/Generic")
  const serviceUtilities = require("../../services/Utilities")
  const serviceUsers = require("../../services/Users")

  var moment = require('moment');

  const mongoose = require("mongoose");

  const Event = require("./../../models/Events")
  const requireLogin = passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/error'
  })

  router.post("/",
   async(req, res) => {
    try {
      var params = req.body
      console.log("params:", params)
      var  evento = await serviceGenerics.create(
        "Events", params)

      return res.json({
           status : status.SUCCESS,
           result : {
             "event":evento
           }})
    } catch (e) {
      console.log("events.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  })


    router.get("/:eventId",
       // requireLogin,
       async (req, res) => {
         try {

           var evento = await serviceEvents.getOne(
             req.params.eventId)

            return res.json({
              status:status.SUCCESS,
              result:{
                "event":evento
                }
              });

         } catch (err) {
           var errorServer = status.ERROR_SERVER
           errorServer.detail = err.message
           res.status(500).send({
               status:errorServer
           });
         }
   })


   router.patch("/:eventId",
      async (req, res) => {
        try {
          console.log("/:eventId->", req.body)
          var attributes = {}
          if(req.body.name){
             attributes.name = req.body.name
          }
          if(req.body.date){
            attributes.date = req.body.date
          }
          if(req.body.urlThumbnail){
            attributes.urlThumbnail = req.body.urlThumbnail
          }

          if(req.body.description){
            attributes.description = req.body.description
          }
          if(req.body.eventUrl){
            attributes.eventUrl = req.body.eventUrl
          }
          if(req.body.products){
            attributes.products = req.body.products
          }
          if(req.body.type){
            attributes.type = req.body.type
          }
          if(req.body.color){
            attributes.color = req.body.color
          }
          if(req.body.status){
            attributes.status = req.body.status
          }
          console.log("PATCH->attributes:", attributes)
          var event = await serviceGenerics.patch(Event,
            attributes,
            req.params.eventId)

          return res.json({
              status:status.SUCCES_UPDATE,
              result:{
                        event
                      }
              });

        } catch (err) {
          var errorServer = status.ERROR_SERVER
          errorServer.detail = err.message
          res.status(500).send({
              status:errorServer
          });
        }
   })

   router.delete("/:eventId",
      async (req, res) => {
        try {
            if(req.params.eventId == null){
              return res.json({
                status:status.ID_INVALID_GENERIC_001
                });
            }else{
              var result = await serviceGenerics.delete(
                Event,  req.params.eventId
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
          console.log("Videos.catch", e)
          var errorServer = status.ERROR_SERVER
          errorServer.detail = e.message
          res.status(500).send({
              status:errorServer
          });
        }
   })

   router.get("/pagination/:skip",
      async (req, res) => {
        console.log("/pagination")
        console.log("req.query:", req.query)
        if(    req.query.date != null
            && req.query.greaterDate != null
            && req.query.lowerDate != null
          ){
          return res.json({
            status:status.ID_INVALID_STEP_MOTION_001
            });
        }
        try {
           var skip = req.params.skip || 1;
           var limit = parseInt(req.query.limit>
             config.RES_PER_PAGE?
               config.RES_PER_PAGE:req.query.limit) || config.RES_PER_PAGE

           var filter = {}
           if(req.query.userId){
             filter.user = req.query.userId
           }
           if(req.query.status){
             filter.status = req.query.status
           }
           if(req.query.type){
             filter.type = req.query.type
           }
           if(req.query.date){
             var date = new Date(req.query.date)
             date.setUTCHours(0)
             date.setUTCMinutes(0)
             date.setUTCSeconds(0)
             date.setUTCMilliseconds(0)

             var finalDate = moment(date).add(1, 'days')

             moment
             filter.date = {
               $gte: date,
               $lt: finalDate
             }
           }

           if(req.query.lowerDate != null  && req.query.greaterDate != null){
             var date = new Date(req.query.greaterDate)
             date.setUTCHours(0)
             date.setUTCMinutes(0)
             date.setUTCSeconds(0)
             date.setUTCMilliseconds(0)

             var finalDate = new Date(req.query.lowerDate)
             date.setUTCHours(0)
             date.setUTCMinutes(0)
             date.setUTCSeconds(0)
             date.setUTCMilliseconds(0)

             filter.date = {
               $gte: date,
               $lt: finalDate
             }
           }
           var sort = {
             date:-1
           }
           var events = await serviceUtilities.getAllEventsWithPagination(
                              Event, filter, skip, limit, sort)

           return res.json({
              status:status.SUCCESS,
              result:{
                events
                }
           });
        } catch (err) {
          var errorServer = status.ERROR_SERVER
          errorServer.detail = err.message
          res.status(500).send({
              status:errorServer
          });
        }
 })

  module.exports = router;
