// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var request = require('sync-request');
module.exports.get = function (url, params, headers) {
    var response = request("GET", url, headers);
    return JSON.parse(response.getBody("UTF-8"));
}

module.exports.post = function (url, params, heaers) {
    var response = request("POST", url, {
        json : params,
        heaers : heaers
    });
    return JSON.parse(response.getBody("UTF-8"));
}