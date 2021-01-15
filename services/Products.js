/**
 * @Author: Guillermo
 * @Date:   2020-08-26T09:25:56-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-02T15:52:17-05:00
 * @License: MIT
 */
 const Products = require("../models/Products");
 const Categories = require("../models/joins/Categories");
 const { DuplicateDataError, InternalError } = require('../models/errors/JuguetilandiaErrors');

 const mongoose = require("mongoose");

 module.exports = {

  getCategoriesBySubcategories : async function(req,category){
    try {
      if(req.query.subcategories==null){
        return null
      }
      return category
        .find({
          subcategories: {
            $in:req.query.subcategories
          }
        })
        .then(c=>{
          // console.log("c:", c)
          return c
        })
        .catch(err=>{
          console.log("err:", err)
          throw new Error('MongoError->Products.getCategoriesBySubcategories:' + err.message);

        })
    } catch (err) {
      console.log("err:", err)
      throw new Error('MongoError->Products.getCategoriesBySubcategories.catch:' + err.message);

    }
  },

 	getAllProducts : async function(req, skip, limit, categories,typeProduct,typeTrademark) {
    try {
      var filter = {}

      if(req.query.trademarks){
        if(req.query.trademarks.lenght>0){
          filter.trademarks = {$in:req.query.trademarks}
        }else{
          filter.trademarks = {$in:req.query.trademarks}
        }
      }
      if(req.query.categories && categories == null){
        if(req.query.categories.lenght>0){
          filter.categories = {$in:req.query.categories}
        }else{
          filter.categories = {$in:req.query.categories}
        }
      }else if(req.query.subcategories && categories != null){
          if(req.query.subcategories.lenght>0){
            filter.categories = {$in:categories}
          }else{
            filter.categories = {$in:categories}
          }
      }

      console.log("filter:", filter)
      return typeProduct
        .find(
          filter,
          {
            name:1,
            description:1,
            sku:1,
            images:1,
            shopUrl:1,
            urlThumbnail:1,
            youtubeURL:1
          }
        )
        .populate({
          path:typeTrademark,
          select:{
            _id:1,
            name:1
          }
        })
        .skip((limit * skip) - limit)
        .limit(limit)
        .sort({name:1})
        .lean()
        .then(products=>{
          return products
        })
        .catch(err=>{
          throw new Error('MongoError->Products.getAllProducts:' + err.message);
        })
    } catch (e) {
      throw new Error('MongoError->Products.getAllProducts.catch:' + err.message);
    }
  },

  create : async function(body,type) {
      function create (body){
        return new type(  //No estoy seguro si esto funcionará
            body
            )
            .save({
              name:body.name
            })
            .then(product=>{
              return product
            })
      };
      try {
        return await create(body)
      } catch (err) {
        console.log("err:", err)
        if(err.message.toUpperCase().includes("DUPLICATE")){
          throw new DuplicateDataError("PRODUCTO")
        }else{
          throw new Error('MongoError->Products.create.exc:' + err.message);
        }
      }
  },

  findById : async function(id,type){
    try {
      return type
        .findById(
          {
            _id:id
          }
        ).then(product=>{
          if(product)
            return product
          else
            return null
        })
    } catch (e) {
      console.log("e:", e)
      throw new Error("MongoError:", e.message)
    }
  },

}
