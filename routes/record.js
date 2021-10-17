const express = require("express");
const request = require("request");
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
//task 1
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
  let apiKey = "AIzaSyA5bwbEsAOUMOI4RK2zXcIayG4vjuQSpcw" 
  let addresses = req.body.addresses;
  let coordinates = {};
  let promises = [];
  for(let index = 0;index<addresses.length;index++)
  {
    let currAddress = addresses[index];
    let targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${currAddress}&key=${apiKey}`;
    const pobj = new Promise((resolve,reject)=>{
      request(targetUrl, function (err, response, body) {
        let geoLocation = JSON.parse(body);
        // let mssg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
        let mssg = {
          lat: `${geoLocation.results[0].geometry.location.lat}`,
          long: `${geoLocation.results[0].geometry.location.lng}`
        }

        resolve(mssg);
      })
    })
    promises.push(pobj);


  
  }

  Promise.all(promises)
  .then((results) => {
    console.log(typeof(results))
    console.log(results)
    let finalResponse = [];
    for (var i = 0; i < results.length; i++)
    {
      finalResponse.push({
      "add" : addresses[i],
      "location":[results[i]["lat"] , results[i]["long"]]
      });
    }
    console.log(finalResponse)
    response.send(finalResponse)
    
  })
  .catch((e) => {
      // Handle errors here
  });
   console.log(coordinates);
 });

 module.exports = recordRoutes;