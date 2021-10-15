const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("status")
    .find({})
    .limit(2)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/add-device-locations/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let DB_URL = req.body;
    let first_collection = req.params.id;
    console.log(first_collection)
    let second_collection = req.query.name;
    var devices;
    db_connect
    .collection(`${first_collection}`)
    .find({})
    .limit(2)
    .toArray(function(err, result){
        if(err) throw err;
        console.log(result);
    });
    
   
    


  });

module.exports = recordRoutes;