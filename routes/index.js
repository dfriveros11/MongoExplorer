var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.mongo.database().then(db => {
    const array1 = Array.from([{ name: "Select a database" }]);
    const databaseFound = Array.from(db);
    const database = array1.concat(databaseFound);
    console.log("database", database);
    res.render("index", {
      database
    });
  });
});

//DATA ENDPOINT FOR COLLECTIONS
router.get("/collection/:name", (req, res) => {
  mu.mongo.collection(req.params.name).then(collection => {
    res.json(collection);
  });
});

//DATA ENDPOINT FOR COLLECTIONS INFO
router.get("/collection/:dbname/:name/:pag", (req, res) => {
  const page = req.params.pag || 1;
  const limit = 20;
  mu.mongo
    .collectionData(req.params.dbname, req.params.name, limit * page - limit)
    .then(collection => {
      res.json(collection);
    });
});

//Create Collection Info
router.post("/collection/create", (req, res) => {
  const databaseName = req.body.databaseName;
  const collectionName = req.body.collectionName;
  mu.mongo
    .insertCollectionData(databaseName, collectionName, req.body.name)
    .then(res.redirect("/"));
});

//Delete a Collection Info
router.post("/collection/delete", (req, res) => {
  const databaseName = req.body.databaseName;
  const collectionName = req.body.collectionName;
  mu.mongo
    .deleteCollectionData(databaseName, collectionName, req.body.name)
    .then(res.redirect("/"));
});

//Update a Collection Info
router.put("/collection/update", (req, res) => {
  const databaseName = req.body.databaseName;
  const collectionName = req.body.collectionName;
  mu.mongo
    .updateCollectionData(
      databaseName,
      collectionName,
      req.body.oldName,
      req.body.newName
    )
    .then(res.redirect("/"));
});

module.exports = router;
