/**
 * @Date:   2020-09-01T21:51:47-05:00
 * @Last modified time: 2020-10-02T19:45:28-05:00
 */

  const express = require("express");
  const passport = require("passport");
  const router = express.Router();
  const status  = require("../../codes/rest")
  const config = require("../../config/keys")
  const serviceBooks = require("../../services/Books")
  const serviceGenerics = require("../../services/Generic")
  const serviceUtilities = require("../../services/Utilities")
  const serviceUsers = require("../../services/Users")

  var moment = require('moment');

  const mongoose = require("mongoose");

  const Book = require("./../../models/Books")
  const requireLogin = passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/error'
  })

  router.post("/",
   async(req, res) => {
    try {
      let params = req.body
      console.log("params:", params)
      let  libro = await serviceGenerics.create(
        "Books", params)

      return res.json({
           status : status.SUCCESS,
           result : {
             "book":libro
           }})
    } catch (e) {
      console.log("books.catch", e)
      let errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  })

//---
    router.get("/:bookId",
       // requireLogin,
       async (req, res) => {
         try {

           let libro = await serviceBooks.getOne(
             req.params.bookId)

            return res.json({
              status:status.SUCCESS,
              result:{
                "book":libro
                }
              });

         } catch (err) {
           let errorServer = status.ERROR_SERVER
           errorServer.detail = err.message
           res.status(500).send({
               status:errorServer
           });
         }
   })


   router.patch("/:bookId",
      async (req, res) => {
        try {
          console.log("/:bookId->", req.body)
          let attributes = {}
          if(req.body.name){
             attributes.name = req.body.name
          }
          if(req.body.urlThumbnail){
            attributes.urlThumbnail = req.body.urlThumbnail
          }
          if(req.body.videoUrl){
            attributes.videoUrl = req.body.videoUrl
          }
          
          console.log("PATCH->attributes:", attributes)
          let book = await serviceGenerics.patch(Book,
            attributes,
            req.params.bookId)

          return res.json({
              status:status.SUCCES_UPDATE,
              result:{
                        book
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

   router.delete("/:bookId",
      async (req, res) => {
        try {
            if(req.params.bookId === null){
              return res.json({
                status:status.ID_INVALID_GENERIC_001
                });
            }else{
              let result = await serviceGenerics.delete(
                Book,  req.params.bookId
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
          console.log("Book.catch", e)
          let errorServer = status.ERROR_SERVER
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
        try {
           const books = await serviceUtilities.getAllBooks(Book)
           return res.json({
              status:status.SUCCESS,
              result:{
                books
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



