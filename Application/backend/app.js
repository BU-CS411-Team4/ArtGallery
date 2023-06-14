const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const artsRoutes = require("./routes/arts");

const app = express();

const uri = "mongodb+srv://dk98:yoLbVTvkmURIEfjP@artgallery.3bkz689.mongodb.net/";

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/arts", artsRoutes)

module.exports = app;
