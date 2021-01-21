const express = require("express");
const router = express.Router();  
const {createCard,getAllCardsByEmail,getCardsWithPagination,getVideo,updateCard} = require('../../controller/newlyborn/cards.controller')

 router.get("/pagination/:skip",getCardsWithPagination)
 router.get("/getAllCardsByEmail",getAllCardsByEmail)
 router.post("/createCard",createCard)
 router.patch("/:cardId",updateCard)
router.get("/getVideo",getVideo)

module.exports = router;
