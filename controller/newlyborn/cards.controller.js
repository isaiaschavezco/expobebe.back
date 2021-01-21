const cardCtrl = {}
const status = require('../../codes/rest')
const config = require('../../config/keys')
const serviceCards = require('../../services/Cards')
const serviceUser = require('../../services/Users')
const {CardNewlyBorn} = require('../../models/Cards')



cardCtrl.createCard = async (req, res) => {
  try {
      console.log(req.body)

      const card = await serviceCards.createCard(req.body,CardNewlyBorn)
    return res.json({
      status: status.SUCCESS,
      result: {
        card
      }
    })
    
  } catch (err) {
    const errorServer = status.ERROR_SERVER
    console.log(err)
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  } 
}


cardCtrl.getCardsWithPagination = async (req, res) => {
  try {
    console.log('CardsEP.pagination:', req.query)
    const skip = req.params.skip || 1
    const limit = parseInt(req.query.limit) || config.RES_PER_PAGE

    const filter = {}
    if (req.query.email) filter.email = req.query.email 
    
    if (req.query.gender) filter.gender = req.query.gender

    const cards = await serviceUser.getAllWithPagination(filter, skip, limit,CardNewlyBorn,"ProductNewlyBorn")

    console.log('filter:', filter)
    return res.json({
      status: status.SUCCESS,
      result: {
        cards
      }
    })
  } catch (err) {
    console.log('UtilitiesEP->getAllCards.err:', err)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  } 
}


cardCtrl.getAllCardsByEmail = async (req, res) => {
  try {
    console.log('getAllCardsByEmail', req.query)
    var cards = await serviceCards.getAllCardsByEmail(req,CardNewlyBorn,"ProductNewlyBorn")
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



cardCtrl.updateCard = async (req, res) => {
  try {
    
    const card = await serviceCards.patchCard(req.params.cardId, req,CardNewlyBorn)
    return res.json({
      status: status.SUCCESS,
      result: {
        card
      }
    })
  } catch (err) {
    console.log('Cards controller .err:', err)
    const errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
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
    const errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports = cardCtrl
