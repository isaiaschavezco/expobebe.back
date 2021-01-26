const userCtrl = {}
  
const express = require( "express" );
  const router = express.Router();
  const status  = require("../codes/rest")
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const keys = require("../config/keys");
  const User = require("../models/Users")
  const mongoose = require("mongoose");
  const crypto = require('crypto');

  var algorithm = keys.CRYPTP_ALGORITHM;
  var inputEncoding = keys.INPUT_ENCODING;
  var outputEncoding = keys.OUTPUT_ENCODING;
  var key = keys.CRYPTP_KEY;

  




userCtrl.login = async(req, res) => {
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
            email:cipheredEmail
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




        bcrypt.compare(
          req.body.password,
          user.password)
          .then(isMatch => {

            try {

              if (isMatch) {
                console.log("Creating token...")
                const payload = {
                              id:user._id,
                           email:cipheredEmail,
                };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 3600 * 2 // 1 year in seconds
                    // expiresIn: 60 // 1 minute in seconds
                    // expiresIn: 2592000 // 30 dias
                  },
                  (err, token) => {
                    

                    

                    var decipher2 = crypto.createDecipher(algorithm, key);
                    var decipheredEmail = decipher2.update(user.email, outputEncoding, inputEncoding);
                    decipheredEmail += decipher2.final(inputEncoding);
                    console.log("decipheredEmail:", decipheredEmail)

                    var userFiltred = {
                       "_id": user._id,
                       
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
  }



  userCtrl.createUser = async (req, res) => {
      try {
        console.log("register=>", req.body)

        if( req.body.email == null ||
            req.body.password == null 
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

        User.findOne({ email: cipheredEmail }).then(user => {
          if (user) {
            console.log("ERROR EN EL USUARIO: CORREO EXISTE PREVIAMENTE")
            return res.status(400).json({ status:status.EMAIL_EXISTS });
          } else {
            const newUser = new User({
              email: cipheredEmail,
              password: req.body.password,
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

                    let decipher = crypto.createDecipher(algorithm, key);
                    let decipheredEmail = decipher.update(user.email, outputEncoding, inputEncoding);
                    decipheredEmail += decipher.final(inputEncoding);


                    const data = {
                       "_id"   : user._id,
                       "email" : decipheredEmail,
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


//Esta parte se encuentra desactivada no sabemos si en proyectos futuros se vuelva a activar 

// userCtrl.recoverPassword = async (req, res) => {
//     console.log("recovery")
//     if( req.body.email == null ||
//         req.body.password == null
//     ){
//       return res
//         .json({
//           status:status.INVALID_DATA_4
//         });
//     }else {
//       var cipher = crypto.createCipher(algorithm, key);
//       var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
//       cipheredEmail += cipher.final(outputEncoding);
//       console.log("cipheredEmail:", cipheredEmail)

//       var update = {}

//       bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(req.body.password, salt, (err, hash) => {
//         update.password = hash
//         // update.isValidated = false //Para no detener a los usuarios
//         var filter = { email: cipheredEmail }
//         User.findOne(
//             filter,
//           )
//           .then(user=>{

//             if (!user) {
//               return res.status(400).json({ status:status.ERROR_SERVER_001 });
//             } else {
//               console.log("filter:", filter)
//               console.log("update:", update)
//               User.findOneAndUpdate(
//                   filter,
//                   update,
//                   {new: true}
//                 )
//                 .then(user=>{
//                   if(user){
//                     res.json({
//                       status:status.SUCCESS,
//                     })
//                   }
//                 })
//             }
//           })

//       })})
//     }
// }

//Esta parte se encuentra desactivada no sabemos si en proyectos futuros se vuelva a activar 



//   userCtrl.sendEmailCode = async (req, res) => {
//     console.log("sendEmail4Code")
//     if( req.body.email == null
//     ){
//       return res
//         .json({
//           status:status.INVALID_DATA_5
//         });
//     }else {
//       var cipher = crypto.createCipher(algorithm, key);
//       var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
//       cipheredEmail += cipher.final(outputEncoding);
//       console.log("cipheredEmail:", cipheredEmail)

//       var filter = { email: cipheredEmail }
//       User.findOne(
//           filter,
//         )
//         .then(user=>{

//           if (!user) {
//             return res.status(400).json({ status:status.ERROR_SERVER_001 });
//           } else {

//             res.json({
//               status:status.SUCCESS,
//             })
//           }
//         })
//     }
// }


//Esta parte se encuentra desactivada no sabemos si en proyectos futuros se vuelva a activar 

// userCtrl.validateUser = (req, res) => {
//     try {
//       console.log("requestResetpwd")
//       if(!req.body.email){
//         return res.json({
//           status:status.INVALID_DATA,
//         });
//       }else{

//         var cipher = crypto.createCipher(algorithm, key);
//         var cipheredEmail = cipher.update(req.body.email, inputEncoding, outputEncoding);
//         cipheredEmail += cipher.final(outputEncoding);
//         console.log("cipheredEmail:", cipheredEmail)

//         User
//           .findOneAndUpdate(
//             {
//               email:cipheredEmail,
//               verificationCode:req.body.verificationCode
//             },
//             {
//               $set:{
//                 verificationCode : (Math.random().toString(36).slice(2)).toUpperCase().replace(/'.'/g, '9').substring(0,4),
//                 dateConfirmation : new Date(),
//                 isValidated:true
//               }
//             },
//             {
//               new:true
//             }
//           ).then(user=>{
//             if(user){
//               res.json({
//                   status:status.SUCCESS,
//                   result:{
//                     isValidated:true
//                   }
//                 })
//             }else{
//               res.json({
//                   status:status.SUCCESS,
//                   result:{
//                     isValidated:false
//                   }
//                 })
//             }
//           })
//           .catch(err => {
//               var errorServer = status.ERROR_SERVER
//               errorServer.message += err.message || "."
//               res.status(500).send({
//                   status:errorServer
//               });
//           });
//       }
//     } catch (err) {
//       var errorServer = status.ERROR_SERVER
//       errorServer.message += err.message || "."
//       res.status(500).send({
//           status:errorServer
//       });
//     }

// }


 module.exports = userCtrl;
