/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:29:24-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:
 * @Last modified time: 2020-09-10T13:13:16-05:00
 * @License: MIT
 */




 const bodyParser = require("body-parser");
 const  {queryParser}   = require('express-query-parser');
 const cors = require('cors')
  console.log("ESTOY EN EXPRESS")

 module.exports = express =>{
   express.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,PATCH,OPTIONS');
     //res.header("Access-Control-Allow-Origin", "*");
       next();
   });

     express.use(
       bodyParser.urlencoded({
         limit: '10mb',extended: true
       })
     );
     express.use (
       bodyParser.json (
         {limit: "10mb"}
     ));


     express.use(
       queryParser({
         parseNull: true,
         parseBoolean: true
       })
     );

     express.use(cors())
     express.options('*', cors())

 };
