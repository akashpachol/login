const express = require('express');
const app = express();
const path=require('path')
const session = require('express-session'); // Import the express-session module

const body_parser=require('body-parser');
const {v4:uuidV4}=require('uuid')

// routes
const router=require('./Router/router')

const port=process.env.PORT||3000

// add view engin in server
app.set('view engine','ejs')

// load static asset to server
app.use('/static',express.static(path.join(__dirname,'public')))
// background image set up
app.use('/asset',express.static(path.join(__dirname,'public/asset')))
// set body parser
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }));

// route middleware
app.use("/",router)




// Configure the session middleware
// app.use(session({ 
//   secret: 'your-secret-key', // Set a secret key for session encryption
//   resave: false,
//   saveUninitialized: true
// }));

// home route



app.listen(port,"localhost", () => {
  console.log('Server is running on port 3000 http://localhost:3000/');
});
