const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

// parse request for json content
app.use(bodyParser.json());

// parse request for url
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
  res.json({ message: "Welcome my people" });
});

require("./routes/product.route.js")(app);

// set port
app.listen(3700, () => {
  console.log("Server is running on port 3700");
});
