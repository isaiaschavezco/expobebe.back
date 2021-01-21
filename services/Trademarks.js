 const {TrademarkNewlyBorn,TrademarkPregnant,TrademarkUnderThreeYears} = require("../models/joins/Trademarks");

 module.exports = {

 	getAllTrademarks : async function(type) {
     console.log("gettt trademarks",type)
    try {
      return type
        .find()
        .sort({order:1})
        .lean()
        .then(trademarks=>{
          return trademarks
        })
        .catch(err=>{
          throw new Error('MongoError->Tradermarks.getAllTrademarks:' + err.message);
        })
    } catch (err) {
      throw new Error('MongoError->Tradermarks.getAllTrademarks:' + err.message);
    }
  }
}
