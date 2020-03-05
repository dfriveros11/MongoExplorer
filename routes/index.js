var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.mongo.database().then(dbs => {
    res.render("index", {
      dbs
    });
  });
});

//DATA ENDPOINT
router.get("/collection/:query", (req, res) => {
  console.log("parms", req.parms);
  mu.mongo.collection(req.params.query).then(collection => {
    res.json(collection);
  });
});

module.exports = router;
