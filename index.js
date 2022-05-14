const tiny = require('tiny-json-http')
const axios = require('axios')
const fs = require('fs')
const apiURL = "http://localhost:1234";

const playerloopSDK = function playerloopSDK(options = {}) {
  this.options = options
  this.secret = options.secret
}

playerloopSDK.prototype.createReport  = function(options) {
  const self = this;
  self.options = { ...self.options, ...options }
  if (!self.options.type || self.options.type == "") {
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
  if (!self.options.player) {
    self.options.player = {"id":"dsfffdfsd"}
  }
  self.options.client = "javascript"
  delete self.options.secret
  if (self.options.attachments) {
    var attachments = self.options.attachments
    delete self.options.attachments
    const prom = new Promise((resolve, reject) => {
      const call = tiny.post({
        url: apiURL + "/reports",
        data: self.options,
        headers: {
          "Authorization": self.secret,
          "Content-Type": "application/json"
        }
      })
      call
      .then(function(data) {
        const reportId = data.body.data.id
        var uploadedA = 0
        //console.log(data.body.data.id)
        attachments.forEach(function(att) {
          self.uploadAttachment(att, reportId)
          .then(function(data) {
            uploadedA++
            if (uploadedA >= attachments.length) {
              resolve(reportId);
            }
          })
          .catch(function(err) {
            reject(err)
          })
        })
      })
      .catch(function(err) {
        console.log("ERR "+err)
        reject(err)
      })
    });
    return prom

  } else {
    const prom = new Promise((resolve, reject) => {
      const call = tiny.post({
          url: apiURL + "/reports",
          data: self.options,
          headers: {
            "Authorization": self.secret,
            "Content-Type": "application/json"
          }
        })
        call
        .then(function(data) {
          resolve(data.body.data.id)
        })
        .catch(function(err) {
          reject(err.body)
        })
    })
    return prom;
  }
}

playerloopSDK.prototype.uploadAttachment  = function(filepath, reportId) {
  const self = this;
  const promise = new Promise((resolve, reject) => {
    var url = apiURL + "/reports/"+reportId+"/attachment"
    axios.post(url, {
      //id: filepath,
      file: fs.createReadStream(filepath)
    }, {
      headers: {
        "Authorization": self.secret,
        'Content-Type': 'multipart/form-data',
        "Content-Disposition": "form-data",
        "filename" : "bella.js",
        "name" : "file"
      }
    })
    .then(function(data) {
      resolve(reportId)
    })
    .catch(function(err) {
      reject(err)
    })

  });
  return promise;
}

playerloopSDK.prototype.createPlayer  = function() {
  /* missing */
}

module.exports = playerloopSDK;