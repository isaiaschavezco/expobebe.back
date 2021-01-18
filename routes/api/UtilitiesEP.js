
 const express = require("express");
 const router = express.Router();
 const passport = require("passport");

 let multer  = require('multer');
 var inspect = require('util').inspect;
 const Busboy = require('busboy');
 const AWS = require('aws-sdk');
 const videoshow = require('videoshow');
 const moment = require("moment")
 const resizeOptimizeImages = require('resize-optimize-images');

 const status  = require("../../codes/rest")
 const config = require("../../config/keys")
 const serviceUtilitites = require("../../services/Utilities")
 const serviceAws = require("../../services/Aws")
 const serviceGenerics = require("../../services/Generic")






 const requireLogin = passport.authenticate('jwt', {
   session: false,
   failureRedirect: '/api/error'
 })

 const ensureSomefile = async function (req, res, next) {
   console.log("1 req.body:", req.body)
   console.log("1 req.file:", req.file)
   if(req.file) {
     return next();
   }
   else {
     res.status(400).send('somefile is missing');
   }
 }


 
  router.get("/listBuckets",
    async (req, res) => {
      console.log("/listBuckets")
      try {
        serviceAws.listBuckets()
      } catch (e) {

      } finally {

      }
    }
  )

  router.post("/uploadFile2",
    async (req, res) => {
      try {
        console.log("2req.body:", req.body)
        console.log("2req.file:", req.file)
        let chunks = [], fname, ftype, fEncoding;
        let busboy = new Busboy({ headers: req.headers });
        var folder = null

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
          if("folder" == fieldname ){
            folder = inspect(val)
          }
        });

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log("mimetype:" + mimetype)
            console.log("req.body:", req.body)
            console.log("req.file:", req.file)

            console.log("fieldname, file, filename, encoding, mimetype:", fieldname, file, filename, encoding, mimetype)

            if(!(mimetype == 'image/jpeg' ||
                 mimetype == 'image/jpg' ||
                 mimetype == 'image/png' ||
                 mimetype == 'video/mp4')){
              res.json({
                  status:status.ID_INVALID3,
              })
            }else{
              console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
              fname = filename.replace(/ /g,"_");
              ftype = mimetype;
              fEncoding = encoding;
              file.on('data', function(data) {
                  chunks.push(data)
              });
              file.on('end', function() {
                  console.log('File [' + filename + '] Finished');
              });
            }
        });

        busboy.on('finish', function() {
          try {
              console.log("finish=>folder, fname:", folder, fname)
              if(folder == null){
                return res.json({
                  status:status.INVALID_DATA_2
                  });
              }
              const options = {
                chunks,
                width: 512,
                quality: 90
              };
              console.log("procesando imagenes")
              resizeOptimizeImages(options)
                .then(a=>{
                  console.log("a:", a)
                })

              folder = folder.split("'").join("")
              const params = {
                  Bucket: 'juguetilandia.media', // your s3 bucket name
                  Key: `${folder}/${fname}`,
                  Body: Buffer.concat(chunks), // concatinating all chunks
                  ACL: 'public-read',
                  ContentEncoding: fEncoding, // optional
                  ContentType: ftype // required
              }
              const s3 = new AWS.S3({
                endpoint: config.SPACE_ENDPOINT,
                accessKeyId: config.SPACES_KEY,
                secretAccessKey: config.SPACES_SECRET
              });
              // we are sending buffer data to s3.
              s3.upload(params, (err, s3res) => {
                  if (err){
                    res.send({err, status: 'error'});
                  } else {
                    res.json({
                        status:status.SUCCESS,
                        result:{
                          image:s3res.Location
                        }
                    })

                  }
              });
          } catch (e) {
              console.log("e:", e)
          }

        });
        req.pipe(busboy);
      } catch (err) {
        console.log("UtilitiesEP->uploadImage.err:", err)
        var errorServer = status.ERROR_SERVER
        errorServer.detail = err.message
        res.status(500).send({
            status:errorServer
        });
      }
    }
)



const app = express();
const path = require('path');
const upload = require('./../../services/UploadMiddleware');
const Resize = require('./../../services/Resize');

router.post('/uploadFile',
  upload.single('myFile'),
  async function (req, res) {

  console.log("uploadFile")
  // console.log("req.body.folder:", req.body.folder)
  // console.log("req.file:", req.file)
  if(req.body.folder == null
    || req.file == null
  ){
    return res.json({
      status:status.ID_INVALID_STEP_MOTION_002
      });
  }
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'La imagen es requerida.'});
  }
  return fileUpload.save(req.file, res, req.body.folder);
});

//Quizá haya que remover estos endpoints

router.post('/viewSection',
  async function (req, res) {
    if(req.body.section == null){
      return res.json({
        status:status.ID_INVALID_VIEW_SECTION
        });
    }
    return res.json({
      status:status.SUCCESS,
      });

});


router.post('/viewCatalog',
  async function (req, res) {
    console.log("View inutil")
    return res.json({
      status:status.SUCCESS
      });
});





module.exports = router;
