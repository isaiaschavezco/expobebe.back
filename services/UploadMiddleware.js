/**
 * @Date:   2020-09-10T19:45:28-05:00
 * @Last modified time: 2020-09-14T12:53:38-05:00
 */
 const multer = require('multer');

 const upload = multer({
   limits: {
     fileSize: 6 * 1024 * 1024,
   }
 });

 module.exports = upload
