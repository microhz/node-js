// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var request = require('sync-request');
module.exports.get = function (url, params, headers) {
    var response = request("GET", url, {headers : headers, qs : params});
    if (response.statusCode != 200) { //200为请求成功
        console("response code error");
        return null;
    }
    return response.getBody("UTF-8"); //将请求结果转为字符串
}

module.exports.post = function (url, params) {
    var response = request('POST', url, {json : params});
    if (response.statusCode != 200) {
        console.log("response code error");
        console.log(response.getBody("utf8"))
        return null;
    }
    return response.getBody("UTF-8");
}