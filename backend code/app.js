var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

var app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/list', (req, res) => {

  User.find( {}, (err, AllUsers) => { 
      if(err) return res.status({ status: "error", message:'internal server error!'});
      return res.send({status: 'success', message: AllUsers });
  })  

});

app.post('/user', async (req, res) => {
  const thisUser = req.body.username.toLowerCase().trim();

  await User.findOne( { username: thisUser }, async (err, user) => {
    if(err) return res.status({ status: "error", message:'internal server error!'})
    if(user) return res.send({ status: "success", message:'user already captured!'});

    const {ip, city, state, country, longitude, latitude } = req.body

    const userDetail = new User( { username: thisUser, ip, city, state, country, longitude, latitude });

    await userDetail.save( ( err, complete) => {
        if(err) return res.send({ status: "error", message:'cannot save, try again!'});
        res.send( { status: "success", message:'user saved!'} );
    } );    
  });

});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
  if(err) return console.log('error connecting to Mongo Atlas')
  console.log(`connected to Mongo Atlas`)
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
