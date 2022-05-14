const PlayerloopSDK = require('../index')
require('dotenv').config()
const path = require('path')
var assert = require('assert');
describe('Create reports', function () {
  it('should create a simple report with only text', function (done) {
    var p = new PlayerloopSDK({ secret: process.env.SECRET });
    p.createReport({text: "test"})
    .then(function(data) {
      done()
    })
    .catch(function(data) {
      console.error(data.response)
      done(data)
    })
  });
  it("should create a report uploading one attachment", function(done) {
    var ptwo = new PlayerloopSDK({ secret: process.env.SECRET });
    ptwo.createReport({
      text: "test",
      attachments: [
        path.resolve('./index.js')
      ]
    })
    .then(function(data) {
      done()
    })
    .catch(function(data) {
      console.error(data.response)
      done(data)
    })
  })
  it("should create a report uploading multiple attachments", function(done) {
    var ptwo = new PlayerloopSDK({ secret: process.env.SECRET });
    ptwo.createReport({
      text: "test",
      attachments: [
        path.resolve('./index.js'),
        path.resolve('./LICENSE.md'),
      ]
    })
    .then(function(data) {
      done()
    })
    .catch(function(data) {
      console.error(data.response)
      done(data)
    })
  })
});