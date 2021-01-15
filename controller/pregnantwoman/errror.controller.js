const errCtrl = {}

 errCtrl.getError =async  (req, res)=>{
   res.status(400).json({
      code: 1002,
      message: "Unauthorized."
    });
 }

 module.exports = errCtrl

