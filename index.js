 //constants
require( 'dotenv' ).config()
const cors = require('cors')
 const morgan = require('morgan')
 //Configs
 const express = require("express");
 var mongoose = require('mongoose').set('debug', true);
 var useragent = require('express-useragent');
 const passport = require("passport");
 const bodyParser = require('body-parser');


 //Endpoints newlyBorn
 //ep = endpoint
 const product_newlyBorn = require("./routes/newlyBorn/product.route");
 const cards_newlyBorn = require("./routes/newlyBorn/cards.route");
 const trademarks_newlyBorn = require("./routes/newlyBorn/trademark.route");
 const events_newlyBorn = require("./routes/newlyBorn/event.route");
 const books_newlyBorn = require("./routes/newlyBorn/book.route");
 const chats_newlyBorn = require("./routes/newlyBorn/chat.route");
 const error_newlyBorn = require("./routes/newlyBorn/error.route");
 //ep = endpoint
 const product_pregnant = require("./routes/pregnantwoman/product.route");
 const cards_pregnant = require("./routes/pregnantwoman/cards.route");
 const trademarks_pregnant = require("./routes/pregnantwoman/trademark.route");
 const events_pregnant = require("./routes/pregnantwoman/event.route");
 const books_pregnant = require("./routes/pregnantwoman/book.route");
 const chats_pregnant = require("./routes/pregnantwoman/chat.route");
 
 //ep = endpoint
 const product_under = require("./routes/underThreeYears/product.route");
 const cards_under = require("./routes/underThreeYears/cards.route");
 const trademarks_under = require("./routes/underThreeYears/trademark.route");
 const events_under = require("./routes/underThreeYears/event.route");
 const books_under = require("./routes/underThreeYears/book.route");
 const chats_under = require("./routes/underThreeYears/chat.route");
 
 //general endpoints
 const videos_ep = require("./routes/api/VideosEP");
 const utilities_ep = require("./routes/api/UtilitiesEP");
 const user_ep = require("./routes/api/UserEP");
 //Init express session
 const app = express();

 // Certificate
//ISAIAS




 passport.authenticate('jwt', {session: false})

 //Init Configs
 require("./config/express")(app);
 require("./config/mongoose")(mongoose);
 require("./config/passport")(passport);

 //Packing libs
 app.use(useragent.express());
 // app.use(express.static(`${__dirname}/public`));
 app.use(passport.initialize());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(morgan('tiny'));
 app.use(cors())

const whitelist = [ 'http://localhost:3000','http://localhost:3001','https://expobebe.netlify.app','https://cms-expobebe.netlify.app' ]
 
const corsOptions = {
  origin: function( origin, callback ) {
    console.log("origin: ",origin);
    if( whitelist.indexOf( origin ) !== -1 )
    {
      callback(null,true)
    } else
    {
      callback(new Error('Not allowed by CORS'))
    }
    
  }
}


 //general endpoints
app.use( "/api/users", user_ep );
 

//Newlyborn endpoints
 app.use("/api/newlyborn/products",cors(corsOptions), product_newlyBorn);
 app.use("/api/newlyborn/trademarks",cors(corsOptions), trademarks_newlyBorn);
 app.use("/api/newlyborn/cards",cors(corsOptions), cards_newlyBorn);
 app.use("/api/newlyborn/books",cors(corsOptions), books_newlyBorn);
 app.use("/api/newlyborn/events",cors(corsOptions), events_newlyBorn);
 app.use("/api/newlyborn/chats",cors(corsOptions), chats_newlyBorn)
 //pregnant endpoints
 app.use("/api/pregnant/products",cors(corsOptions), product_pregnant);
 app.use("/api/pregnant/trademarks",cors(corsOptions), trademarks_pregnant);
 app.use("/api/pregnant/cards",cors(corsOptions), cards_pregnant);
 app.use("/api/pregnant/books",cors(corsOptions), books_pregnant);
 app.use("/api/pregnant/events",cors(corsOptions), events_pregnant);
 app.use("/api/pregnant/chats",cors(corsOptions), chats_pregnant)
 //pregnant underThreeyears
 app.use("/api/under/products",cors(corsOptions), product_under);
 app.use("/api/under/trademarks",cors(corsOptions), trademarks_under);
 app.use("/api/under/cards",cors(corsOptions), cards_under);
 app.use("/api/under/books",cors(corsOptions), books_under);
 app.use("/api/under/events",cors(corsOptions), events_under);
 app.use("/api/under/chats",cors(corsOptions), chats_under)
 
 
 //General enpoints
 app.use( "/api/error",cors(corsOptions), error_newlyBorn );
 app.use("/api/videos",cors(corsOptions), videos_ep);
app.use( "/api/utilities",cors(corsOptions), utilities_ep );
 
app.get( "/",cors(corsOptions), (req,res) => {
   res.send("Genial!")
 })


 // Starting  http & https servers
  
  // const httpsServer = https.createServer(credentials, app);
  const PORT = process.env.PORT || 3000 

  app.listen(PORT, () => {
  	console.log(`API REST Expo bebe is running on port ${PORT} Felicidades!`);
  });

