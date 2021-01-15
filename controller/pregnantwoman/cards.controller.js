const cardCtrl = {}
const status = require('../../codes/rest')
const config = require('../../config/keys')
const configWalmart = require('../../config/walmart')

const serviceCards = require('../../services/Cards')
const serviceWalmart = require('../../services/Walmart')
const serviceUser = require('../../services/Users')
const serviceProductos = require('../../services/Products')
const serviceGenerics = require('../../services/Generic')
const serviceUtilitites = require('../../services/Utilities')

const {CardNewlyBorn} = require('../../models/Cards')
const {ProductNewlyBorn} = require('../../models/Products')


// const URL_CREATE_CARD =
//   configWalmart.SERVER_WALMART + configWalmart.URL_START_CARD
// const URL_ADD_ON_CARD =
//   configWalmart.SERVER_WALMART + configWalmart.URL_ADD_ON_CARD
// const URL_COMPLETE_CARD =
//   configWalmart.SERVER_WALMART + configWalmart.URL_COMPLETE_CARD

cardCtrl.getCardsWithPagination = async (req, res) => {
  try {
    console.log('CardsEP.pagination:', req.query)
    var skip = req.params.skip || 1
    var limit = parseInt(req.query.limit) || config.RES_PER_PAGE

    var filter = {}
    if (req.query.matchName) {
      const users = await serviceUser.getIdsByFilter(req.query.matchName)
      console.log('users:', users)
      if (users) {
        filter.user = {
          $in: users
        }
      }
    }

    if (req.query.status) {
      filter.status = req.query.status
    }

    const cards = await serviceUser.getAllWithPagination(filter, skip, limit,CardNewlyBorn)

    console.log('filter:', filter)
    return res.json({
      status: status.SUCCESS,
      result: {
        cards
      }
    })
  } catch (err) {
    console.log('UtilitiesEP->getAllBanners.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  } finally {
  }
}

cardCtrl.getAllCardsByUserId = async (req, res) => {
  try {
    console.log('getAllCardsByUserId', req.query)
    var cards = await serviceCards.getAllCardsByUserId(req,CardNewlyBorn,"ProductNewlyBorn")
    return res.json({
      status: status.SUCCESS,
      result: {
        cards
      }
    })
  } catch (err) {
    console.log('UtilitiesEP->getAllBanners.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

cardCtrl.createCard = async (req, res) => {
  try {
    if (req.body.user == null) {
      return res.json({
        status: status.ID_INVALID_CREATE_CARD
      })
    }
    var user = await serviceUser.getById(req.body.user)
    if (user == null) {
      return res.json({
        status: status.ERROR_SERVER_001
      })
    } else {
      const card = await serviceCards.createCard(req)
    return res.json({
      status: status.SUCCESS,
      result: {
        card
      }
    })
    }
    
  } catch (err) {
    console.log('CardsEP->createCard.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  } finally {
  }
}

cardCtrl.updateCard = async (req, res) => {
  try {
    const user = await serviceUser.getById(req.body.user)

    if (user == null) {
      return res.json({
        status: status.ID_INVALID_PATCH_CARD
      })
    }

    const cardOri = await serviceCards.findOneCard(req.params.cardId)
    var card = await serviceCards.patchCard(req.params.cardId, req,CardNewlyBorn)
    return res.json({
      status: status.SUCCESS,
      result: {
        card
      }
    })
  } catch (err) {
    console.log('UtilitiesEP->getAllBanners.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  } finally {
    // envio del dato del sku de los juguetes en la carta
    if (req.body.products && req.body.products.length > 0) {
      var skus = []

      for (var i = 0; i < req.body.products.length; i++) {
        var prod = req.body.products[i]
        console.log('prod:', prod)
        if (prod) {
          var product = await serviceProductos.findById(prod,ProductNewlyBorn)
          if (product && user) {
            var response = await serviceWalmart.post(URL_ADD_ON_CARD, {
              email: email,
              sku: product.sku
            })
            skus.push(product.sku)
            console.log('response[' + i + ']:', response)
          }
        }
      }
      //envio de que ya termino la carta
      if (req.body.status == 'SENDED' && user) {
        var response = await serviceWalmart.post(URL_COMPLETE_CARD, {
          email: email,
          skus
        })
      }
    }
  }
}

cardCtrl.getVideo = async (req, res) => {
  try {
    if (req.query.name == null) {
      return res.json({
        status: status.NAME_REQUIRED
      })
    } else {
      return res.json({
        status: status.SUCCESS_VIDEO,
        result: {
          videoURL: 'https://www.youtube.com/watch?v=iRMGqTWqVuo'
        }
      })
    }
  } catch (err) {
    console.log('UtilitiesEP->getAllBanners.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports = cardCtrl
