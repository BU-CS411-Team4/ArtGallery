const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const artsRoutes = require("./routes/arts");
const generateRoutes = require("./routes/generate");

const app = express();
app.use(cors());
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));


require('dotenv').config()
const auth = process.env.MONGODB_API_TOKEN;

const uri = `mongodb+srv://dk98:${auth}@artgallery.3bkz689.mongodb.net/`;
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
app.use("/api/generate", generateRoutes)

module.exports = app;
