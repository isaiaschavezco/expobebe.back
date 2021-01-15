/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:25:44-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-09-25T12:30:27-05:00
 * @License: MIT
 */
//constants
 const fs = require('fs');
 const http = require('http');
 const https = require('https');

//Configs
const express = require("express");
// const multer = require("multer");
var mongoose = require('mongoose').set('debug', true);
var useragent = require('express-useragent');
const passport = require("passport");
const bodyParser = require('body-parser');

//Endpoints
const productEP = require("./routes/api/ProductEP");
const utilitiesEP = require("./routes/api/UtilitiesEP");
const userEP = require("./routes/api/UserEP");
const cardsEP = require("./routes/api/CardsEP");
const trademarksEP = require("./routes/api/TrademarksEP");
const videosEP = require("./routes/api/VideosEP");
const stopMotionEP = require("./routes/api/StopMotionEP");
const eventsEP = require("./routes/api/EventEP");
//isaias
const booksEP = require("./routes/api/BookEP");
//isaias

const bannersEP = require("./routes/api/BannerEP");
const chatsEP = require("./routes/api/ChatEP");
const gamesEP = require("./routes/api/GamesEP")

const errorEP = require("./routes/api/ErrorEP");

//Init express session
const app = express();

passport.authenticate('jwt', {session: false})

//Init Configs
require("./config/express")(app);
require("./config/mongoose")(mongoose);
require("./config/passport")(passport);
console.log("HOLA MUNDO");
//Packing libs
app.use(useragent.express());
// app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Packing endpoints
app.use("/api/products", productEP);
app.use("/api/utilities", utilitiesEP);
app.use("/api/cards", cardsEP);
app.use("/api/users", userEP);
app.use("/api/trademarks", trademarksEP);
app.use("/api/videos", videosEP);
app.use("/api/stopMotion", stopMotionEP);
app.use("/api/events", eventsEP);

//isaias
app.use("/api/books", booksEP);
//isaias

app.use("/api/banners", bannersEP);
app.use("/api/chats", chatsEP)
app.use("/api/games", gamesEP)
app.use("/api/error", errorEP);


//Init server
const port = process.env.PORT || 5556;
//const port = 5556;

app.listen(port, () => {
  console.log(`Juguetilandia server... up and running on port ${port} !`)
});
