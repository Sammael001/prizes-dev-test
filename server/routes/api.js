const dotenv = require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const Prize = require("../models/Prize");


const prizesData = [
  { 
    name: "Vintage LP Player", 
    description: "A vintage record player with a collection of rare LPs",
    imageUrl: "img-1.png",
    stock: 5
  },
  {
    name: "iPhone", 
    description: "A brand new Apple iPhone Pro Max",
    imageUrl: "img-2.png",
    stock: 5
  },
  { 
    name: "In-Home Karaoke System", 
    description: "An in-home karaoke system with installation included",
    imageUrl: "img-3.png",
    stock: 5
  },
  { 
    name: "One Year of Roadside Assistance", 
    description: "A full year's membership in our Platinum Roadside Assistance Program",
    imageUrl: "img-4.jpg",
    stock: 5
  },
  { 
    name: "Mystery Prize", 
    description: "What is it? Who knows!",
    imageUrl: "img-5.png",
    stock: 5
  },
  { 
    name: "Playstation 5", 
    description: "A brand new PS5 with Dualsense wireless controller",
    imageUrl: "img-6.png",
    stock: 5
  },
  
];

const router = express.Router(); 


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cfetv.mongodb.net/mossDB?retryWrites=true&w=majority`);
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