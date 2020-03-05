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
  const query = {
    name: new RegExp(`.*${req.params.query}.*`, "i")
  };
  mu.grades.find(query).then(grades => {
    res.json(grades);
  });
});

module.exports = router;
