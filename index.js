const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Toy Puzzles server is running now!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
