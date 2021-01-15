
 const express = require("express");
 const router = express.Router();
 const passport = require("passport");

 let multer  = require('multer');
 // let upload  = multer({ storage: multer.memoryStorage() });
 var inspect = require('util').inspect;
 // const UUID = require('uuid/v4');
 const Busboy = require('busboy');
 const AWS = require('aws-sdk');
 const videoshow = require('videoshow');
 const moment = require("moment")
 const resizeOptimizeImages = require('resize-optimize-images');

 const status  = require("../../codes/rest")
 const config = require("../../config/keys")
 const configWalmart = require("../../config/walmart")

 const serviceUtilitites = require("../../services/Utilities")
 const serviceWalmart = require("../../services/Walmart")
 const serviceAws = require("../../services/Aws")
 const serviceGenerics = require("../../services/Generic")



 const URL_VIEW_SECTION = configWalmart.SERVER_WALMART + configWalmart.URL_VIEW_SECTION
 const URL_PLAY_GAME = configWalmart.SERVER_WALMART + configWalmart.URL_PLAY_GAME


 configWalmart.SERVER_WALMART + configWalmart

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
),

 router.post("/createVideo",
  async (req, res) => {
    try {
      var initDate = moment(new Date())
      console.log("cargando imagenes")
      var secondsToShowEachImage = 0.5

      var images = [
      
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02956.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02957.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02958.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02959.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02960.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02961.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02962.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02963.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02964.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02965.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02967.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02968.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02969.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02970.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02971.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02972.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02973.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02974.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02975.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02976.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02977.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02978.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02979.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02980.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02981.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02982.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02983.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02984.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02985.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02986.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02987.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02988.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02989.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02990.JPG', loop: secondsToShowEachImage},
        {path: '/Users/memo/Documents/workspaces/inmersys/juguetilandia/routes/api/HasbroStopMotion/DSC02991.JPG', loop: secondsToShowEachImage},


      ]

      console.log("imagenes cargadas")
      console.log("images:", images)

      var videoOptions = {
        // fps: 1,
        // loop: 5, // seconds
        transition: false,
        // transitionDuration: 0, // seconds
        // videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
      }



   

      videoshow(images, videoOptions)
                // .audio('song.mp3')
                .save('video.mp4')
                .on('start', function (command) {
                  console.log('ffmpeg process started:', command)
                  console.log("init:", new Date())
                })
                .on('error', function (err, stdout, stderr) {
                  console.error('Error:', err)
                  console.error('ffmpeg stderr:', stderr)
                  var errorServer = status.ERROR_SERVER
                  errorServer.detail = err.message
                  res.status(500).send({
                      status:errorServer
                  });
                })
                .on('end', function (output) {
                  console.log('Video created in:', output)
                  var finalDate = moment(new Date())
                  res.json({
                      status:status.SUCCESS,
                      result:{
                        dimensions:"512 × 288",
                        initDate,
                        finalDate,
                      }})
                })


    } catch (err) {
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    }
 })


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

router.post('/viewSection',
  async function (req, res) {
    if(req.body.section == null){
      return res.json({
        status:status.ID_INVALID_VIEW_SECTION
        });
    }
    var response = await serviceWalmart.post(URL_VIEW_SECTION, req.body)
    console.log("response:", response)
    return res.json({
      status:status.SUCCESS,
      result:{
        status: response.status,
        statusText: response.statusText
        }
      });

});


router.post('/viewCatalog',
  async function (req, res) {
    console.log("/viewCatalog")
    console.log("req.body:", req.body)
    if( req.body.catalog == null ||
        req.body.value == null ||
        req.body.email == null){
          return res.json({
            status:status.ID_INVALID_VIEW_CATALOG
            });
    }

    var enumVal = await serviceWalmart.getEnum(req.body.catalog)
    var body = {}
    body.email = req.body.email
    console.log("enumVal:", enumVal)
    if(req.body.catalog == "GAME"){
      body.game = {
        name : req.body.value
      }
    }else if(req.body.catalog == "EVENT"){
      body.event = {
        name : req.body.value
      }
    }else{
      body[enumVal.value] = req.body.value
    }

    var response = await serviceWalmart.post(enumVal.url, body)

    console.log("response:", response)
    return res.json({
      status:status.SUCCESS,
      result:{
        status: response.status,
        statusText: response.statusText
        }
      });
});





module.exports = router;
