const eventCtrl = {}
  const express = require("express");
  const status  = require("../../codes/rest")
  const config = require("../../config/keys")
  const serviceEvents = require("../../services/Events")
  const serviceGenerics = require("../../services/Generic")
  const serviceUtilities = require("../../services/Utilities")
 const {EventNewlyBorn} = require("../../models/Events")

  var moment = require('moment');


eventCtrl.createEvent= async (req, res)=>{
    try {
      const params = req.body
      const  evento = await serviceGenerics.create("EventNewlyBorn", params)
      return res.json({
           status : status.SUCCESS,
           result : {
             "event":evento
           }})
    } catch (e) {
      console.log("events.catch", e)
      const errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  }


    
eventCtrl.getEvent= async (req, res)=>{
         try {

           const evento = await serviceEvents.getOne(
             req.params.eventId,EventNewlyBorn)

            return res.json({
              status:status.SUCCESS,
              result:{
                "event":evento
                }
              });

         } catch (err) {
           const errorServer = status.ERROR_SERVER
           errorServer.detail = err.message
           res.status(500).send({
               status:errorServer
           });
         }
   }


eventCtrl.updateEvent= async (req, res)=>{
        try {
          console.log("/:eventId->", req.body)
          let attributes = {}
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
          if(req.body.route){
            attributes.route = req.body.route
          }
          console.log("PATCH->attributes:", attributes)
          const event = await serviceGenerics.patch(EventNewlyBorn,
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
   }


      eventCtrl.deleteEvent = async (req, res) =>{
        try {
            if(req.params.eventId == null){
              return res.json({
                status:status.ID_INVALID_GENERIC_001
                });
            }else{
              var result = await serviceGenerics.delete(
                EventNewlyBorn,  req.params.eventId
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
   }

      eventCtrl.getEventWithPagination= async (req, res)=>{
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
                              EventNewlyBorn,"ProductsNewlyBorn", filter, skip, limit, sort)

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
 }


 module.exports =  eventCtrl