/**
 * @Date:   2020-09-01T12:19:52-05:00
 * @Last modified time: 2020-09-01T12:19:53-05:00
 */
 const express = require("express");
 const router = express.Router();

 router.get("/", (req, res) => {
   res.status(400).json({
      code: 1002,
      message: "Unauthorized."
    });
 });

 module.exports = router;
