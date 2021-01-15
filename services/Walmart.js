/**
 * @Date:   2020-09-09T15:01:21-05:00
 * @Last modified time: 2020-10-12T11:55:32-05:00
 */
 const axios = require('axios')
 const config = require('./../config/walmart')

 const URL_VIEW_BRAND = config.SERVER_WALMART + config.URL_VIEW_BRAND
 const URL_VIEW_PRODUCT = config.SERVER_WALMART + config.URL_VIEW_PRODUCT
 const URL_VIEW_GAME = config.SERVER_WALMART + config.URL_VIEW_GAME
 const URL_VIEW_EVENT = config.SERVER_WALMART + config.URL_VIEW_EVENT


 const headers = {
   'Igni-Token': config.IGNI_TOKEN
 }

 module.exports = {

  register : async function(body){
    console.log("Walmart.register")
    console.log("Walmart.body:", body)
    var URL = config.SERVER_WALMART+config.URL_REGISTER
    console.log("URL:", URL)

    try {
      axios
          .post(URL, body, {headers})
          .then(res => {
            console.log("res=>", res)
          })
          .catch(err =>{
            console.log("err:", err)
          });
    } catch (e) {
        console.log("e:", e)
        throw new Error("Walmart->Generic.register.catch:"+ e.message)
    }
  },


  post : async function(URL, body){
    console.log("register")
    console.log("body:", body)
    console.log("URL:", URL)
    try {
      return axios
          .post(URL, body, {headers})
          .then(res => {
            console.log("res=>", res)
            return res
          })
          .catch(err =>{
            console.log("err:", err)
            return null
          });
    } catch (e) {
        console.log("e:", e)
        throw new Error("Walmart->Generic.post.catch["+URL+"]:"+ e.message)
    }
  },

  getEnum : async function(data){
    console.log("getEnum.data=>'"+ data +"'")
    switch (data) {
      case 'TRADEMARK':
          return {
            url:URL_VIEW_BRAND,
            value:"brand"
          }
        break;

        case 'PRODUCT':
            return {
              url :URL_VIEW_PRODUCT,
              value:"sku"
            }
          break;

          case 'GAME':
              return {
                url : URL_VIEW_GAME,
                value : "game"
              }
            break;

            case 'EVENT':
                return {
                  url : URL_VIEW_EVENT,
                  value : "event"
                }
              break;


      default:
          return null
    }
  }

}
