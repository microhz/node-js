// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
// var request = require('request')
exports.get = function (url, params, req, res, view, opt) {
    if (opt.headers) {

    }
    http.get(url,function(request,response) {
        var data = "";
        request.on('data',function(chunk) {
            data += chunk;
            res.send(data);
        })
    })
}

exports.post = function (url, params, req, res, opt) {

}