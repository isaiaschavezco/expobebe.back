  const express = require("express");
  const router = express.Router();
  const status  = require("../../codes/rest")
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const keys = require("../../config/keys");
  const User = require("../../models/Users")
  const mongoose = require("mongoose");
  const crypto = require('crypto');

  var algorithm = keys.CRYPTP_ALGORITHM;
  var inputEncoding = keys.INPUT_ENCODING;
  var outputEncoding = keys.OUTPUT_ENCODING;
  var key = keys.CRYPTP_KEY;

  




  router.post("/login",
    async(req, res) => {
    var isSuccessful = false

    try {
      console.log("/login")
      const email = req.body.email;
      const password = req.body.password;
      console.log("email:", email)
      console.log("password:"  + password)

      var cipher = crypto.createCipher(algorithm, key);
      var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
      cipheredEmail += cipher.final(outputEncoding);
      console.log("cipheredEmail:", cipheredEmail)



        User.findOne({
            email:cipheredEmail,
            isValidated:true
           })
        .then(user => {
        console.log("user:"+JSON.stringify(user))
        if (!user) {
          return res.json({
            status: status.INVALID_DATA
          });
        }
        console.log("")
        console.log("user.password:", user.password)


        var decipher2 =  crypto.createDecipher(algorithm, key);
        var decipheredName = decipher2.update(user.name, outputEncoding, inputEncoding);
        decipheredName += decipher2.final(inputEncoding);
        console.log("decipheredName:", decipheredName)

        bcrypt.compare(
          req.body.password,
          user.password)
          .then(isMatch => {

            try {

              if (isMatch) {
                console.log("Creating token...")
                const payload = {
                              id:user.id,
                            name:decipheredName,
                           email:cipheredEmail,
                };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926 // 1 year in seconds
                    // expiresIn: 60 // 1 minute in seconds
                    // expiresIn: 2592000 // 30 dias
                  },
                  (err, token) => {
                    console.log("err=>", err)
                    console.log("token:", token)

                    var decipher = crypto.createDecipher(algorithm, key);
                    var decipheredName = decipher.update(user.name, outputEncoding, inputEncoding);
                    decipheredName += decipher.final(inputEncoding);
                    console.log("decipheredName:", decipheredName)

                    var decipher2 = crypto.createDecipher(algorithm, key);
                    var decipheredEmail = decipher2.update(user.email, outputEncoding, inputEncoding);
                    decipheredEmail += decipher2.final(inputEncoding);
                    console.log("decipheredEmail:", decipheredEmail)

                    var userFiltred = {
                       "_id": user._id,
                       "nombre": decipheredName,
                       "email": decipheredEmail,
                    }
                    isSuccessful = true
                    res.json({
                       status : status.SUCCESS,
                       result : {
                         token : token,
                         user  : userFiltred
                      }
                    });
                  }
                );
              } else {
                return res
                  .json({
                    status:status.ERROR_SERVER_001
                  });
              }
            } catch (e) {
              console.log("error3:", e)
            }
        })
        .catch(err=>{
          var errorServer = status.ERROR_SERVER
          errorServer.detail = err.message
          res.status(500).send({
              status:errorServer
          });
        })
        ;
      })
      .catch(err => {
          var errorServer = status.ERROR_SERVER
          errorServer.detail = err.message
          res.status(500).send({
              status:errorServer
          });
      });
    } catch (err) {
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
          status:errorServer
      });
    } finally{

    }
  });



  router.post("/register",
  async (req, res) => {
      try {
        console.log("register=>", req.body)

        if( req.body.email == null ||
            req.body.password == null ||
            req.body.name == null ||
            req.body.phoneNumber == null
          ){
              return res
                .json({
                  status:status.INVALID_DATA_1
                });
        }
        var cipher = crypto.createCipher(algorithm, key);
        var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
        cipheredEmail += cipher.final(outputEncoding);
        console.log("cipheredEmail:", cipheredEmail)

        cipher = crypto.createCipher(algorithm, key);
        var cipheredName = cipher.update(req.body.name, inputEncoding, outputEncoding);
        cipheredName += cipher.final(outputEncoding);
        console.log("cipheredName:", cipheredName)

        cipher = crypto.createCipher(algorithm, key);
        var cipheredPhone = cipher.update(req.body.phoneNumber, inputEncoding, outputEncoding);
        cipheredPhone += cipher.final(outputEncoding);
        console.log("cipheredPhone:", cipheredPhone)

        User.findOne({ email: cipheredEmail }).then(user => {
          if (user) {
            console.log("ERROR EN EL USUARIO: CORREO EXISTE PREVIAMENTE")
            return res.status(400).json({ status:status.EMAIL_EXISTS });
          } else {
            var verificationCode = (Math.random().toString(36).slice(2)).toUpperCase().replace(/'.'/g, '9').substring(0,4)
            const newUser = new User({
              name: cipheredName,
              email: cipheredEmail,
              password: req.body.password,
              phoneNumber: cipheredPhone,
              verificationCode
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    console.log("user:" + user)

                    var decipher = crypto.createDecipher(algorithm, key);
                    var decipheredEmail = decipher.update(user.email, outputEncoding, inputEncoding);
                    decipheredEmail += decipher.final(inputEncoding);

                    var decipher2 = crypto.createDecipher(algorithm, key);
                    var decipheredName = decipher2.update(user.name, outputEncoding, inputEncoding);
                    decipheredName += decipher2.final(inputEncoding);
                    //
                    var decipher3 = crypto.createDecipher(algorithm, key);
                    var decipheredPhone = decipher3.update(user.phoneNumber, outputEncoding, inputEncoding);
                    decipheredPhone += decipher3.final(inputEncoding);

                    var data = {
                       "_id"   : user._id,
                       "name"  : decipheredName,
                       "email" : decipheredEmail,
                       "phoneNumber": decipheredPhone,
                    }

                    res.json({
                      status:status.SUCCESS,
                      result:data
                    })
                  })
                  .catch(err => {
                    console.log("error:", err)
                    var errorServer = status.ERROR_SERVER
                    errorServer.detail = err.message
                    res.json({
                      errorServer
                    })
                  });
              });
            });
          }
        });
      } catch (err) {
        console.log("Error2:", err)
        var errorServer = status.ERROR_SERVER
        errorServer.detail = err.message
        res.json({
          errorServer
        })
      } finally {

      }
  }
);



router.post("/recovery",
  async (req, res) => {
    console.log("recovery")
    if( req.body.email == null ||
        req.body.password == null
    ){
      return res
        .json({
          status:status.INVALID_DATA_4
        });
    }else {
      var cipher = crypto.createCipher(algorithm, key);
      var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
      cipheredEmail += cipher.final(outputEncoding);
      console.log("cipheredEmail:", cipheredEmail)

      var update = {}

      bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        update.password = hash
        // update.isValidated = false //Para no detener a los usuarios
        var filter = { email: cipheredEmail }
        User.findOne(
            filter,
          )
          .then(user=>{

            if (!user) {
              return res.status(400).json({ status:status.ERROR_SERVER_001 });
            } else {
              console.log("filter:", filter)
              console.log("update:", update)
              User.findOneAndUpdate(
                  filter,
                  update,
                  {new: true}
                )
                .then(user=>{
                  if(user){
                    res.json({
                      status:status.SUCCESS,
                    })
                  }
                })
            }
          })

      })})
    }
});


router.post("/sendEmail4Code",
  async (req, res) => {
    console.log("sendEmail4Code")
    if( req.body.email == null
    ){
      return res
        .json({
          status:status.INVALID_DATA_5
        });
    }else {
      var cipher = crypto.createCipher(algorithm, key);
      var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
      cipheredEmail += cipher.final(outputEncoding);
      console.log("cipheredEmail:", cipheredEmail)

      var filter = { email: cipheredEmail }
      User.findOne(
          filter,
        )
        .then(user=>{

          if (!user) {
            return res.status(400).json({ status:status.ERROR_SERVER_001 });
          } else {

            res.json({
              status:status.SUCCESS,
            })
          }
        })
    }
});



router.post("/validate",
  (req, res) => {
    try {
      console.log("requestResetpwd")
      if(!req.body.email){
        return res.json({
          status:status.INVALID_DATA,
        });
      }else{

        var cipher = crypto.createCipher(algorithm, key);
        var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
        cipheredEmail += cipher.final(outputEncoding);
        console.log("cipheredEmail:", cipheredEmail)

        User
          .findOneAndUpdate(
            {
              email:cipheredEmail,
              verificationCode:req.body.verificationCode
            },
            {
              $set:{
                verificationCode : (Math.random().toString(36).slice(2)).toUpperCase().replace(/'.'/g, '9').substring(0,4),
                dateConfirmation : new Date(),
                isValidated:true
              }
            },
            {
              new:true
            }
          ).then(user=>{
            if(user){
              res.json({
                  status:status.SUCCESS,
                  result:{
                    isValidated:true
                  }
                })
            }else{
              res.json({
                  status:status.SUCCESS,
                  result:{
                    isValidated:false
                  }
                })
            }
          })
          .catch(err => {
              var errorServer = status.ERROR_SERVER
              errorServer.message += err.message || "."
              res.status(500).send({
                  status:errorServer
              });
          });
      }
    } catch (err) {
      var errorServer = status.ERROR_SERVER
      errorServer.message += err.message || "."
      res.status(500).send({
          status:errorServer
      });
    }

});


 module.exports = router;
