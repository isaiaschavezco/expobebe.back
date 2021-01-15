/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:30:31-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   Guillermo
 * @Last modified time: 2020-08-25T18:54:30-05:00
 * @License: MIT
 */
 const db = require("./keys").mongoURI;
 // console.log("db:>" + db)
module.exports = mongoose => {
  console.log("Configuring mongoose....")
  // mongoose.set('debug', true);
  mongoose.set('debug', process.env.DEBUG_MONGOOSE?process.env.DEBUG_MONGOOSE:false);
  mongoose
    .connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      console.log("\n\n\n MongoDB with mongoose -> successfully connected")
    })
    .catch(err => {
      console.log("\n\n\n ERROR:",err)
    });

    mongoose.connection.on('error',function (err) {
         console.error('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
         console.error('Mongoose disconnected');
    });
};
