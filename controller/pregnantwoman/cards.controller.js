const cardCtrl = {}
const status = require('../../codes/rest')
const config = require('../../config/keys')
const serviceCards = require('../../services/Cards')
const serviceUser = require('../../services/Users')
const {CardPregnant} = require('../../models/Cards')

cardCtrl.getCardsWithPagination = async (req, res) => {
  try {
    console.log('CardsEP.pagination:', req.query)
    const skip = req.params.skip || 1
    const limit = parseInt(req.query.limit) || config.RES_PER_PAGE

    const filter = {}
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

    const cards = await serviceUser.getAllWithPagination(filter, skip, limit,CardPregnant)

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
  } 
}

cardCtrl.getAllCardsByUserId = async (req, res) => {
  try {
    console.log('getAllCardsByUserId', req.query)
    var cards = await serviceCards.getAllCardsByUserId(req,CardPregnant,"ProductsPregnant")
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
      console.log(req.body)

      const card = await serviceCards.createCard(req.body,CardPregnant)
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

cardCtrl.updateCard = async (req, res) => {
  try {
    const user = await serviceUser.getById(req.body.user)
    if (user == null) {
      return res.json({
        status: status.ID_INVALID_PATCH_CARD
      })
    }
    const card = await serviceCards.patchCard(req.params.cardId, req,CardPregnant)
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
