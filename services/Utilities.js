/**
 * @Date:   2020-09-01T22:38:54-05:00
 * @Last modified time: 2020-10-07T23:54:53-05:00
 */
 const Events = require("./../models/Events")
 const mongoose = require("mongoose");
 const multer = require("multer");
 const MulterSharpResizer = require("multer-sharp-resizer");
 const keys = require("./../config/keys");
 const crypto = require('crypto');

 var algorithm = keys.CRYPTP_ALGORITHM;
 var inputEncoding = keys.INPUT_ENCODING;
 var outputEncoding = keys.OUTPUT_ENCODING;
 var key = keys.CRYPTP_KEY;


 module.exports = {

      createDecipher : async function (data){
        var decipher = crypto.createDecipher(algorithm, key);
        var decipheredValue = decipher.update(data, outputEncoding, inputEncoding);
        decipheredValue += decipher.final(inputEncoding);
        return decipheredValue
      },

     getAllEventsWithPagination : async function(type, filter, skip, limit, sort){
       try {
         var filter2 = {
           skip:(limit * skip) - limit,
           limit:limit,
         }
         if(sort){
           filter2.sort = sort
         }

         console.log("filter2:", filter2)
          return type
           .find(
             filter,
             {},
             filter2
           )
           .populate('products')
           .then(objects=>{
             // console.log("objects:", objects)
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
     getAllBooks : async function(type){
       try {
          return type
           .find()
           .then(objects=>{
             // console.log("objects:", objects)
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


    resizeImagesGalleryFunc : async function(req, res) {
      try {const today = new Date();
      const year = today.getFullYear();
      const month = `${today.getMonth() + 1}`.padStart(2, "0");
      const filename = `gallery-${Date.now()}.jpeg`;
      const sizes = [
        {
          path: "original",
          width: null,
          height: null,
        },
        {
          path: "large",
          width: 800,
          height: 800,
        },
        {
          path: "medium",
          width: 300,
          height: 300,
        },
        {
          path: "thumbnail",
          width: 100,
          height: 100,
        },
      ];
      const uploadPath = `./public/uploads/${year}/${month}`;
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${year}/${month}`;// sharp options
      const sharpOptions = {
        fit: "contain",
        background: { r: 255, g: 255, b: 255 },
      };
      const resizeObj = new MulterSharpResizer(
        req,
        filename,
        sizes,
        uploadPath,
        fileUrl,
        sharpOptions
      );// call resize method for resizing files
      const images = resizeObj.getData();
      return images
      } catch (err) {
          console.log(err);
        }
      },

}
