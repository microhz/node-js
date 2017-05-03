// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var request = require('sync-request');
module.exports.get = function (url, params, headers) {
    var response = request("GET", url, {headers : headers, qs : params});
    if (response.statusCode != 200) {
        console("response code error");
        return null;
    }
    return JSON.parse(response.getBody("UTF-8"));
}

module.exports.post = function (url, params, headers) {
    if (!headers) {
        headers = {
            "Content-type": "application/json"
        }
    }
    var response = request("POST", url, {
        json : params,
        headers : headers
    });
    if (response.statusCode != 200) {
        console.log("response code error");
        return null;
    }
    return JSON.parse(response.getBody("UTF-8"));
}