/**
 * @Author: memo
 * @Date:   2020-09-10T19:58:16-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-21T22:52:03-05:00
 */
const sharp = require('sharp');
const path = require('path');
const AWS = require('aws-sdk');
const config = require("./../config/keys")

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(file, res, folder) {
    const filename = file.originalname
    const filepath = this.filepath(filename);
    console.log("resizing")
    await sharp(file.buffer)
      .resize(1024, 1024, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toBuffer()
      .then(buffer=>{
        console.log("buffer building...")
        // console.log("buffer:", buffer)
        const params = {
            Bucket: config.BUCKET_NAME,
            Key: `${folder}/${filename}`,
            Body: buffer,
            ACL: 'public-read',
            ContentType: file.mimetype
        }
        const s3 = new AWS.S3({
          endpoint: config.SPACE_ENDPOINT,
          accessKeyId: config.SPACES_KEY,
          secretAccessKey: config.SPACES_SECRET
        });
        s3.upload(params, (err, s3res) => {
            if (err){
              res.send({err, status: 'error'});
            } else {
              console.log("s3res:", s3res)
              return res.json({
                  status:"200",
                  result:{
                    image:s3res.Location
                  }
              })
            }
        });
      })
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
