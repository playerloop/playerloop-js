const PlayerloopSDK = require('./index')
require('dotenv').config()

var p = new PlayerloopSDK({ secret: process.env.SECRET });
p.createReport({text: "test"})
.then(function(data) {
  console.log(data)
})