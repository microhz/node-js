// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var request = require('sync-request')
var Q = require('q')
var Promise = require('Promise')
var cookie = require('cookie')
module.exports.get = function (url, params, req, res) {
    // var deferred = Q.defer();
    console.log('get url : ' + url + ", params : " + JSON.stringify(params));
    var response = request("GET", url, { headers: req.headers, qs: params });
    if (response.statusCode != 200) {
        console("response code error");
        return null;
    }
    var data = response.getBody("UTF-8");
    // res.headers = response.headers;
    res.sendFile("/",{headers : response.headers});
    return data;
    // deferred.resovle(data);
    // return deferred.promise;
}

module.exports.post = function (url, params) {
    var response = request('POST', url, { json: params });
    if (response.statusCode != 200) {
        console.log("response code error");
        console.log(response.getBody("utf8"))
        return null;
    }
    return response.getBody("UTF-8");
}

// ---- 以下为多个请求汇总 ---
function get(url, params, headers) {
    var deferred = Q.defer();
    console.log('get url : ' + url + ", params : " + JSON.stringify(params) + ",headers : " + JSON.stringify(headers));
    var response = request("GET", url, { headers: headers, qs: params });

    if (response.statusCode != 200) {
        console("response code error");
        return null;
    }
    var data = response.getBody("UTF-8");
    console.log(data);
    deferred.resolve(data);
    return deferred.promise;
}

// var url1 = "http://www.baidu.com";
// var url2 = "http://www.tuicool.com/articles/QnIfqq";

// function chainExecute() {
//     var a = [];
//     get(url1).then(function (res) {
//         a.push(res);
//         console.log(res);
//         console.log('first request exeucted..');
//         return get(url2)
//     }).then(function (res2) {
//         console.log('second request exeucted..');
//         console.log(res2);
//         a.push(res2);
//         return a;
//     }).then(function (a) {
//         console.log(a);
//     });
//     // 同步串行 
// }

// chainExecute();

// function sumAsync() {
//     // 多个异步数据汇总 result_array为返回结果
//     Q.all([get(url1), get(url2)]).then(function (result_array) {
//         console.log(result_array)
//     })
// }

// sumAsync();
