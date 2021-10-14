const express = require("express");
const mongoose = require("mongoose");
const Prize = require("../models/Prize");

const prizesData = [
  { 
    name: "Vintage LP Player", 
    description: "A vintage record player with a collection of rare LPs",
    imageUrl: "lpUrl",
    stock: 5
  },
  { 
    name: "iPhone", 
    description: "A brand new Apple iPhone Pro Max",
    imageUrl: "iphoneUrl",
    stock: 5
  },
  { 
    name: "In-Home Karaoke System", 
    description: "An in-home karaoke system with installation included",
    imageUrl: "karaokeUrl",
    stock: 5
  },
  { 
    name: "One Year of Roadside Assistance", 
    description: "A full year's membership in our Platinum Roadside Assistance Program",
    imageUrl: "roadsideURL",
    stock: 5
  },
  { 
    name: "Mystery Prize", 
    description: "What is it? Who knows!",
    imageUrl: "mysteryURL",
    stock: 5
  },
  { 
    name: "Playstation 5", 
    description: "A brand new PS5 with Dualsense wireless controller",
    imageUrl: "ps5URL",
    stock: 5
  },
  
];

const router = express.Router();

// REMOVE CONNECTION URI BEFORE COMMITTING
mongoose.connect("mongodb+srv://dev-test-user:ihigtj80k@cluster0-cfetv.mongodb.net/mossDB");
mongoose.connection.once("open", () => {
  console.log("...Connected to DB...")
});

// this route fires when we hit localhost:5000/api/
// returns all prize data
router.get("/", (req, res) => {
  Prize.find({}, (err, prizes) => {
    if (err) { 
      console.log(err);
      res.send("An error occurred: ", err)
    } else {
      res.send(prizes);
    }
  });
});

// this route fires when we hit localhost:5000/api/renew
// reloads all prizes with stock: 5
router.get("/renew", (req, res) => {
  Prize.deleteMany({}, (err, res) => {
    if (err) console.log(err);

    prizesData.forEach(prize => {
      let newPrize = new Prize({ 
        name: prize.name, 
        description: prize.description,
        imageUrl: prize.imageUrl,
        stock: prize.stock
      })
      newPrize.save();
    });

  })
  res.send("Renewed prize list");
});

// this route fires when we hit localhost:5000/api/prize/
router.get("/prize/", (req, res) => {
  console.log(req.query);
  if (!req.query.id) {
    console.log("No ID!")
  } else {
    // route for specific prize page
  }
});


// if we navigate to http://localhost:5000/api/redeem/?id=5000 ...
router.get("/redeem/", (req, res) => {
  let mysteryID = "61689f5aaf430e265a958834";
  console.log(req.query); // ... this logs {id: '5000'}
  if (!req.query.id) {
    console.log("No ID!")
  } else {

  }
  res.send("got query?");
});

module.exports = router;