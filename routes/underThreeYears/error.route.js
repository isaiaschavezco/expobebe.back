/**
 * @Date:   2020-09-01T12:19:52-05:00
 * @Last modified time: 2020-09-01T12:19:53-05:00
 */
 const express = require("express");
 const router = express.Router();
const {getError} = require('../../controller/underThreeYears/errror.controller')

 router.get("/",getError);

 module.exports = router;
