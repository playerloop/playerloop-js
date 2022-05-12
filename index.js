const https = require('https')
const apiURL = "https://api.playerloop.io";

const playerloopSDK = function playerloopSDK(options = {}) {
  this.options = options
}

playerloopSDK.prototype.createReport  = function(options) {
  const self = this;
  self.options = { ...self.options, ...options }
  if (!self.options.type) {
    self.options.type = "bug"
  }
  if (self.options.type != "bug" && self.options.type != "feedback") {
    throw new Error("options.type can either be bug or feedback")
  }
  if (!self.options.accepted_privacy) {
    self.options.accepted_privacy = true
  }
  if (!self.options.text) {
    throw new Error("Text is mandatory")
  }
  if (!self.options.secret) {
    throw new Error("Secret is mandatory")
  }
  self.options.client = "npm"
  const call = new Promise((resolve, reject) => {
    https.request({
      host: apiURL,
      port: 443,
      body: options,
      method: "POST",
      path: "/reports",
      headers: {
        "Authorization": self.options.secret,
        "Content-Type": "application/json"
      }
    }, function(res) {
      if (res.statusCode > 201) {
        reject(res.statusMessage)
      }
      resolve(res.body)
    })
  })
  return call;
}

playerloopSDK.prototype.createPlayer  = function() {
  /* missing */
}

function validatePlayerObject() {
  /* here we should validate the optional player object on the client side if needed */
}

module.exports = playerloopSDK;