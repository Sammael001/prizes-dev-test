const express = require("express");
const cors = require("cors");

const PORT = process.env.port || 5000;

// https://www.youtube.com/watch?v=X-JZ-QPApUs&ab_channel=TraversyMedia

// TO DO: 
// add /client dir to .gitignore
// remove connection URI from mongoose connection
// remove HOW TO... .TXT

const app = express();

// middleware
app.use(cors());

// require in api file in routes folder
const api = require("./routes/api");
app.use("/api", api); // when we hit /api, use the routes in api.js



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));