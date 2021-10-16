const dotenv = require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const Prize = require("../models/Prize");


const prizesData = [
  { 
    name: "Vintage LP Player", 
    description: "A vintage record player with a collection of rare LPs. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "img-1.png",
    stock: 5
  },
  {
    name: "iPhone", 
    description: "A brand new Apple iPhone Pro Max. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "img-2.png",
    stock: 5
  },
  { 
    name: "In-Home Karaoke System", 
    description: "An in-home karaoke system with installation included. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "img-3.png",
    stock: 5
  },
  { 
    name: "One Year of Roadside Assistance", 
    description: "A full year's membership in our Platinum Roadside Assistance Program. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "img-4.jpg",
    stock: 5
  },
  { 
    name: "Mystery Prize", 
    description: "What is it? Who knows! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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

// this route returns all prize data from the DB
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

// this route wipes the collection and reloads it with data from the prizesData array; used for testing
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

// http://localhost:5000/api/prize/?id=616ac23b8b0875f0c50c96fa
// this route takes an id query and returns the data for a specific prize 
router.get("/prize/", (req, res) => {
  console.log(req.query);
  if (!req.query.id) {
    console.log("No ID!")
  } else {
    Prize.findById(req.query.id, (err, foundPrize) => {
      if (err) {
        console.log(err);
      } else if (!foundPrize) {
        console.log("No prize found for that ID!");
      } else {
        res.send(foundPrize);
      }
    });
  }
});

// http://localhost:5000/api/redeem/?id=616ac23b8b0875f0c50c96f9
// this route takes an id query and decrements the stock of that prize by 1
router.get("/redeem/", (req, res) => {
  console.log(req.query); 
  if (!req.query.id) {
    console.log("No ID!")
  } else {
    Prize.findByIdAndUpdate(req.query.id, {$inc : {stock : -1}}, { new: true }, (err, prize) => {
      if (err) { 
        console.log(err);
      } else if (!prize) {
        console.log("No prize found for that ID!");
      } else {
        res.send(prize);
      }
    })
  }

});

module.exports = router;