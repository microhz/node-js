// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var Q = require('q')
var Promise = require('Promise')
var cookie = require('cookie')
var _url = require('url')
var request = require('request');
var cookie_parse = require('cookie-parser');
var qs = require('querystring')
var _ = require('lodash')

module.exports.get = function (url, params, req, res, options) {
    return new Promise((resolve,reject) => {
        var callback = (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                var setCookie = response.headers["set-cookie"]
                _.forEach(setCookie, (o) => {
                    var c = cookie.parse(o);
                    _.forEach(c, (v, k) => {
                        res.cookie(k, v);
                    })
                })
                resolve(body);
            }
        }

        var j = request.jar();
        for (var k in req.cookies) {
            var v = req.cookies[k];
            var c = k + "=" + v;
            console.log(c);
            var _cookie = request.cookie(c);
            j.setCookie(_cookie, url);
        }
        var options = {
            method : "GET",
            url : url,
            qs : params ? params : "",
            headers : {
                "content-type" : "application/json"
            },
            jar : j
        }
        // 发送请求
        request(options, callback);
    })
}

module.exports.post = function (url, params, req, res) {
    return new Promise((resolve, reject) => {

        var callback = (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                var setCookie = response.headers["set-cookie"]
                _.forEach(setCookie, (o) => {
                    var c = cookie.parse(o);
                    _.forEach(c, (v, k) => {
                        res.cookie(k, v);
                    })
                })
                resolve(body);
            }
        }

        var options = {
            method : "POST",
            url : url,
            form : params,
            headers : {
                "Content-type": "application/json",
                "Cookie" : cookie_parse.JSONCookies(req.cookies)
            }
        };
        request(options , callback)
    })
}
