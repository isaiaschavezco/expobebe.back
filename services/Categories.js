module.exports = {
 	getAllCategories : async function(type) {
    try {
      return type
        .find()
        .populate('subcategories')
        .sort({name:1})
        .lean()
        .then(categories=>{
          return categories
        })
        .catch(err=>{
          throw new Error('MongoError->Categories.getAllCategories:' + err.message);
        })
    } catch (err) {
      throw new Error('ExceptionCategories->' + err.message);
    }
  }
}
