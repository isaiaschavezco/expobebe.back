
  const trademarkCtrl = {}
const status  = require("../../codes/rest")
 const serviceGenerics = require("../../services/Generic")
 const {TrademarkUnderThreeYears} = require("./../../models/joins/Trademarks")


  trademarkCtrl.getTrademark = async(req, res) =>{
   try {
     var  trademark = await serviceGenerics.read(
       TrademarkUnderThreeYears, req.params.tradeMarkId)

     return res.json({
          status : status.SUCCESS,
          result : {
            trademark
          }})
   } catch (e) {
     console.log("Trademarks.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
 }


  trademarkCtrl.createTrademark= async (req, res) => {
   try {
     const trademark = await serviceGenerics.create(
       "TrademarkUnderThreeYears", req.body)

     return res.json({
          status : status.SUCCESS,
          result : {
            trademark
          }})
   } catch (e) {
     console.log("Trademarks.catch", e)
     var errorServer = status.ERROR_SERVER
     errorServer.detail = e.message
     res.status(500).send({
         status:errorServer
     });
   }
 }

  trademarkCtrl.updateTradeMark =  async (req, res)=>{
    try {
        var attributes = {}
        if(req.body.name) attributes.name = req.body.name
        if(req.body.imageURL) attributes.imageURL = req.body.imageURL
        if(req.body.color) attributes.color = req.body.color

        var trademark = await serviceGenerics.patch(
          TrademarkUnderThreeYears, attributes, req.params.tradeMarkId
        )
        return res.json({
             status : status.SUCCES_UPDATE,
             result : {
               trademarks:trademark
             }})
    } catch (e){
      console.log("Trademarks.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
 }

 trademarkCtrl.deleteTrademark =  async (req, res)=>{
    try {
      console.log("req.params.tradeMarkId:", req.params.tradeMarkId)
        if(req.params.tradeMarkId == null){
          return res.json({
            status:status.ID_INVALID_GENERIC_001
            });
        }else{
          var result = await serviceGenerics.delete(
            TrademarkUnderThreeYears,  req.params.tradeMarkId
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
      console.log("Trademarks.catch", e)
      var errorServer = status.ERROR_SERVER
      errorServer.detail = e.message
      res.status(500).send({
          status:errorServer
      });
    }
  }

  module.exports =  trademarkCtrl


