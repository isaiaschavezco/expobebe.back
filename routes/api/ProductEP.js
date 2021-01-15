/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:59:11-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-06T21:49:59-05:00
 * @License: MIT
 */

 const express = require("express");
 const router = express.Router();
 const status  = require("../../codes/rest")
 const config = require("../../config/keys")
 const serviceTrademarks = require("../../services/Trademarks")
 const serviceCategories = require("../../services/Categories")
 const serviceProducts = require("../../services/Products")
 const serviceGenerics = require("../../services/Generic")


 const Products = require("../../models/Products")
 const { DuplicateDataError, InternalError } = require('../../models/errors/JuguetilandiaErrors');

 router.get("/getAllTrademarks",
  // requireLogin,
  async (req, res) => {
    try {
      var trademarks = await serviceTrademarks.getAllTrademarks()
      return res.json({
        status:status.SUCCESS,
        result:{
          trademarks
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

router.get("/getAllCategories",
 // requireLogin,
 async (req, res) => {
   try {
     var categories = await serviceCategories.getAllCategories()
     return res.json({
       status:status.SUCCESS,
       result:{
         categories
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


router.get("/pagination/:skip",
 // requireLogin,
 async (req, res) => {
   console.log("/pagination")
   console.log("req.query:", req.query)
   try {
     var skip = req.params.skip || 1;
     var limit = parseInt(req.query.limit>
        config.RES_PER_PAGE?
          config.RES_PER_PAGE:req.query.limit) || config.RES_PER_PAGE

     // var products = await serviceProducts.getAllProducts(req, skip, limit)
     var categories = await serviceProducts.getCategoriesBySubcategories(req)
     console.log("categories===>", categories)
     var products = await serviceProducts.getAllProducts(req, skip, limit, categories)
     return res.json({
       status:status.SUCCESS,
       result:{
         products
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

router.get("/:productId",
 async(req, res) => {
  try {
    var product = await serviceGenerics.read(
      Products, req.params.productId)

    return res.json({
         status : status.SUCCESS,
         result : {
           product
         }})

  } catch (e) {
    console.log("ProductsEp.catch", e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
        status:errorServer
    });
  }
})

router.post("/",
  async(req,res)=>{
    console.log("req.body:", req.body)
    try {
      if(req.body.name == null || req.body.description == null ||
         req.body.sku == null //|| //req.body.trademarks == null ||
         // req.body.shopUrl == null
      ){
        return res.json({
          status:status.INVALID_DATA_3
          });
      }else{
        var product = await serviceProducts.create(req.body)
        return res.json({
          status:status.SUCCESS,
          result:{
            product
          }
          });
      }
    } catch (err) {
      console.log("err->", err)

      if(err instanceof DuplicateDataError){
        return res.json({
          status:status.DUPLICATE_DATA
          });
      }else{
        var errorServer = status.ERROR_SERVER
        errorServer.detail = err.message
        res.status(500).send({
          status:errorServer
        });
      }
    }
}),

router.patch("/:productId",
 async(req, res) => {
   try {
     console.log("req.body:", JSON.stringify(req.body))
       var attributes = {}
       if(req.body.name) attributes.name = req.body.name
       if(req.body.sku) attributes.sku = req.body.sku
       if(req.body.description) attributes.description = req.body.description
       if(req.body.trademarks) attributes.trademarks = req.body.trademarks
       if(req.body.categories) attributes.categories = req.body.categories
       if(req.body.shopUrl) attributes.shopUrl = req.body.shopUrl
       if(req.body.images) attributes.images = req.body.images
       if(req.body.youtubeURL) attributes.youtubeURL = req.body.youtubeURL
       if(req.body.urlThumbnail) attributes.urlThumbnail = req.body.urlThumbnail
       if(req.body.video) attributes.video = req.body.video

       var product = await serviceGenerics.patch(
         Products, attributes, req.params.productId
       )
       return res.json({
            status : status.SUCCESS,
            result : {
              product
            }})
   } catch (e){
     console.log("ProductsEP.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
}),


router.delete("/:productId",
 async(req, res) => {
   try {
     console.log("req.params.productId:", req.params.productId)
       if(req.params.productId == null){
         return res.json({
           status:status.ID_INVALID_GENERIC_001
           });
       }else{
         var result = await serviceGenerics.delete(
           Products,  req.params.productId
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
     console.log("ProductsEP.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
 });


 router.get("/get/Combobox",
  async(req, res) => {
    try {
        Products.
          find({},{name:1})
          .then(products=>{
            return res.json({
                 status : status.SUCCESS,
                 result : {
                   products
                 }})
          })

    } catch (e) {
      console.log("ProductsEP.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  })


  router.post("/postExample",
    async(req, res) => {
      console.log("postExample")
      console.log("req.body:", req.body)
      res.json({
          status : status.SUCCESS,
          })
    })

    router.get("/filterByTrademark/:tradeMarkId",
      async(req, res) => {
        console.log("filterByTrademark")
        console.log("req.params.tradeMarkId:", req.params.tradeMarkId)

        try {
            Products
              .find({
                    trademarks:{
                      $in: [req.params.tradeMarkId]
                    }
                  },
              {name:1})

              // .aggregate(
              //    [  {
              //      trademarks:{
              //              $in: [req.params.tradeMarkId]
              //            }
              //    },
              //      {
              //        $project:
              //          {
              //            // _id,
              //            name: { $toUpper: "$name" }
              //          }
              //      }
              //    ]
              // )

              .then(products=>{
                console.log("products:", products.length)
                return res.json({
                     status : status.SUCCESS,
                     result : {
                       products
                     }})
              })

        } catch (e) {
          console.log("ProductsEP.catch", e)
          var errorServer = status.ERROR_SERVER
          errorServer.detail = e.message
          res.status(500).send({
              status:errorServer
          });
        }

      })




module.exports = router;
