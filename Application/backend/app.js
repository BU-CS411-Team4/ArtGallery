const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const passportSetup = require('./services/passport');

const artsRoutes = require("./routes/arts");
const generateRoutes = require("./routes/generate");
const authRoutes = require("./routes/auth");

// MongoDB
require('dotenv').config()
const auth = process.env.MONGODB_API_TOKEN;
const uri = `mongodb+srv://dk98:${auth}@artgallery.3bkz689.mongodb.net/`;
mongoose
  .connect(uri,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

// express
const app = express();

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  Passport: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('assets'));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api/arts", artsRoutes)
app.use("/api/generate", generateRoutes)
app.use("/api/auth", authRoutes)

module.exports = app;
