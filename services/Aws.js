/**
 * @Author: Guillermo
 * @Date:   2020-08-28T10:31:45-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   Guillermo
 * @Last modified time: 2020-08-28T10:40:37-05:00
 * @License: MIT
 */
  const mongoose = require("mongoose");
  const AWS = require('aws-sdk');
  const config = require("./../config/keys")
  var params = {
    Bucket: config.BUCKET_NAME
  };

  module.exports = {

   listBuckets : async function(req){

     const s3 = new AWS.S3({
       endpoint: config.SPACE_ENDPOINT,
       accessKeyId: config.SPACES_KEY,
       secretAccessKey: config.SPACES_SECRET
     });

     s3.listBuckets({}, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            data['Buckets'].forEach(function(space) {
                console.log(space['Name']);
            })
        };
     });

   },
 }
