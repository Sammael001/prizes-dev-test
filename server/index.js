const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());

// require in api file in routes folder
const api = require("./routes/api");
app.use("/api", api); // when we hit /api, use the routes in api.js

// when in production
if (process.env.NODE_ENV === "production") {
  // serve assets from static folder
  app.use(express.static(__dirname + "/public/"));
  // serve SPA -- this must be listed AFTER app.use("/api", api)
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));