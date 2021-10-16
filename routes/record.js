const express = require("express");
const recordRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/get-devices").get(function (req, res) {
  let db_connect = dbo.getDb("_CONCOX_");
  db_connect
    .collection("devices")
    .find({})
    .limit(12)
    .toArray(function (err, result) {
      if (err) throw err;
    //   console.log(result[0]._id)
      res.json(result);
    });
});

// This section will help you get a list of all the records.
recordRoutes.route("/get-status").get(function (req, res) {
  let db_connect = dbo.getDb("_CONCOX_");
  db_connect
    .collection("status")
    .distinct("device",{},function (err, result) {
      if (err) throw err;
    //   console.log(result[0]._id)
      res.json(result);
    })
    
});

// This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect
//       .collection("records")
//       .findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
// });

// This section will help you create a new record.
recordRoutes.route("/locations/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let db_url = req.body;
 let collection_1 = req.params.id;
 let collection_2 = req.query.name;

 db_connect
 .collection(`${collection_1}`)
 .aggregate([
     { $lookup:
      {
        from: 'status',
        as: 'statusDetail',
        let: { id: "$id" },
        pipeline:[
         { 
           $match: { 
             $expr: { $eq: ["$$id", "$device"] },
          },
        },
        {$sort: {  'createdAt': -1 }},
        {$limit:50}
        ]
      }
    }
 ])
 .sort({createdAt:-1})
 .limit(30)
 .toArray(function(err, res) {
    if (err) throw err;
    let ans = {};
    // ans[key] = [{lat,lon},{lat,long},{}]
    console.log("Checkpoint#1")
    for(let i=0;i<res.length;i++){
        let arr = [];
        for(let j=0;j<res[i].statusDetail.length;j++){
            arr.push(res[i].statusDetail[j].gps);
        }
        ans[res[i].id] = arr;
    }
    response.send(ans);
  });
    
 });

  // Task-2
  recordRoutes.route("/locations-coordinates").post(function (req, response) {
  let addresses = req.body.addresses;
  response.send(addresses);
  console.log(addresses);
 });

 module.exports = recordRoutes;