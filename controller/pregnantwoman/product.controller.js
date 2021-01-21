const productCrl = {}
const status = require('../../codes/rest')
const config = require('../../config/keys')
const serviceTrademarks = require('../../services/Trademarks')
const serviceCategories = require('../../services/Categories')
const serviceProducts = require('../../services/Products')
const serviceGenerics = require('../../services/Generic')

 const {TrademarkPregnant} = require("../../models/joins/Trademarks");
 const {CategoryPregnant} = require("../../models/joins/Categories");


const {ProductPregnant} = require('../../models/Products')
const {
  DuplicateDataError
} = require('../../models/errors/JuguetilandiaErrors')

productCrl.getAllTrademarks = async (req, res) => {
    console.log("PREGNED")

  try {
    console.log("Obteniendo trademarks pregnant")
    const trademarks = await serviceTrademarks.getAllTrademarks(TrademarkPregnant)
    return res.json({
      status: status.SUCCESS,
      result: {
        trademarks
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.getAllCategories  = async (req, res) => {
  try {
    var categories = await serviceCategories.getAllCategories(CategoryPregnant)
    return res.json({
      status: status.SUCCESS,
      result: {
        categories
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.getProductsWithPagination = async (req, res) => {
  console.log('/pagination')
  console.log('req.query:', req.query)
  try {
    var skip = req.params.skip || 1
    var limit =
      parseInt(
        req.query.limit > config.RES_PER_PAGE
          ? config.RES_PER_PAGE
          : req.query.limit
      ) || config.RES_PER_PAGE

    var categories = await serviceProducts.getCategoriesBySubcategories(req,CategoryPregnant)
    console.log('categories===>', categories)
    var products = await serviceProducts.getAllProducts(
      req,
      skip,
      limit,
      categories,
      ProductPregnant,
      'TrademarksPregnant'
    )
    return res.json({
      status: status.SUCCESS,
      result: {
        products
      }
    })
  } catch (err) {
    var errorServer = status.ERROR_SERVER
    errorServer.detail = err.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.getProduct = async (req, res) => {
  try {
    const product = await serviceGenerics.read(ProductPregnant, req.params.productId)

    return res.json({
      status: status.SUCCESS,
      result: {
        product
      }
    })
  } catch (e) {
    console.log('ProductsEp.catch', e)
    const errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.createProduct = async (req, res)=> {
  console.log('req.body:', req.body)
  try {
    if (
      req.body.name == null ||
      req.body.description == null ||
      req.body.sku == null 
    ) {
      return res.json({
        status: status.INVALID_DATA_3
      })
    } else {
      var product = await serviceProducts.create(req.body,ProductPregnant)
      return res.json({
        status: status.SUCCESS,
        result: {
          product
        }
      })
    }
  } catch (err) {
    console.log('err->', err)

    if (err instanceof DuplicateDataError) {
      return res.json({
        status: status.DUPLICATE_DATA
      })
    } else {
      var errorServer = status.ERROR_SERVER
      errorServer.detail = err.message
      res.status(500).send({
        status: errorServer
      })
    }
  }
}

productCrl.updateProduct = async (req, res)=> {
  try {
    console.log('req.body:', JSON.stringify(req.body))
    var attributes = {}
    if (req.body.name) attributes.name = req.body.name
    if (req.body.sku) attributes.sku = req.body.sku
    if (req.body.description) attributes.description = req.body.description
    if (req.body.trademarks) attributes.trademarks = req.body.trademarks
    if (req.body.categories) attributes.categories = req.body.categories
    if (req.body.shopUrl) attributes.shopUrl = req.body.shopUrl
    if (req.body.images) attributes.images = req.body.images
    if (req.body.youtubeURL) attributes.youtubeURL = req.body.youtubeURL
    if (req.body.urlThumbnail) attributes.urlThumbnail = req.body.urlThumbnail
    if (req.body.video) attributes.video = req.body.video

    var product = await serviceGenerics.patch(
      ProductPregnant,
      attributes,
      req.params.productId
    )
    return res.json({
      status: status.SUCCESS,
      result: {
        product
      }
    })
  } catch (e) {
    console.log('ProductsEP.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.deleteProduct = async (req, res)=> {
  try {
    console.log('req.params.productId:', req.params.productId)
    if (req.params.productId == null) {
      return res.json({
        status: status.ID_INVALID_GENERIC_001
      })
    } else {
      var result = await serviceGenerics.delete(ProductPregnant, req.params.productId)
      console.log('result:', result)

      if (result && result.ok == 1 && result.n > 0) {
        var statusResp = status.SUCCESS_DELETE
        statusResp.detail = result.n

        return res.json({
          status: statusResp
        })
      } else {
        return res.json({
          status: status.ID_INVALID_GENERIC_002
        })
      }
    }
  } catch (e) {
    console.log('ProductsEP.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.getCombobox = async (req, res)=> {
  try {
    ProductPregnant.find({}, { name: 1 }).then(products => {
      return res.json({
        status: status.SUCCESS,
        result: {
          products
        }
      })
    })
  } catch (e) {
    console.log('ProductsEP.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

productCrl.postExample = async (req, res)=> {
  console.log('postExample')
  console.log('req.body:', req.body)
  res.json({
    status: status.SUCCESS
  })
}

productCrl.filterByTrademark = async (req, res)=> {
  console.log('filterByTrademark')
  console.log('req.params.tradeMarkId:', req.params.tradeMarkId)
  
  try {
    ProductPregnant.find(
      {
        trademarks: {
          $in: [req.params.tradeMarkId]
        }
      },
      { name: 1 }
    ).then(products => {
      console.log('products:', products.length)
      return res.json({
        status: status.SUCCESS,
        result: {
          products
        }
      })
    })
  } catch (e) {
    console.log('ProductsEP.catch', e)
    var errorServer = status.ERROR_SERVER
    errorServer.detail = e.message
    res.status(500).send({
      status: errorServer
    })
  }
}

module.exports = productCrl;
