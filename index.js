 //constants

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


 //general endpoints
app.use( "/api/users", user_ep );
 

//Newlyborn endpoints
 app.use("/api/newlyborn/products", product_newlyBorn);
 app.use("/api/newlyborn/trademarks", trademarks_newlyBorn);
 app.use("/api/newlyborn/cards", cards_newlyBorn);
 app.use("/api/newlyborn/books", books_newlyBorn);
 app.use("/api/newlyborn/events", events_newlyBorn);
 app.use("/api/newlyborn/chats", chats_newlyBorn)
 //pregnant endpoints
 app.use("/api/pregnant/products", product_pregnant);
 app.use("/api/pregnant/trademarks", trademarks_pregnant);
 app.use("/api/pregnant/cards", cards_pregnant);
 app.use("/api/pregnant/books", books_pregnant);
 app.use("/api/pregnant/events", events_pregnant);
 app.use("/api/pregnant/chats", chats_pregnant)
 //pregnant underThreeyears
 app.use("/api/under/products", product_under);
 app.use("/api/under/trademarks", trademarks_under);
 app.use("/api/under/cards", cards_under);
 app.use("/api/under/books", books_under);
 app.use("/api/under/events", events_under);
 app.use("/api/under/chats", chats_under)
 
 
 //General enpoints
 app.use( "/api/error", error_newlyBorn );
 app.use("/api/videos", videos_ep);
 app.use("/api/utilities", utilities_ep);



 // Starting  http & https servers
  
  // const httpsServer = https.createServer(credentials, app);
  const PORT = 3000 

  app.listen(PORT, () => {
  	console.log(`API REST Juguetilandia HTTP Server running on port ${PORT}`);
  });

