// http 请求转发
var http = require('http')
var promise = require('promise')
var config = require('../config/api')
var Q = require('q')
var Promise = require('Promise')
var cookie = require('cookie')
var _url = require('url')
var request = require('request');
// module.exports.get = function (url, options, req, res) {
//     return new Promise((resolve,reject) => {
//         request(url, function(err, response ,body) { //response--java相应给node  req--浏览器请求node   res--node返回给浏览器
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(body);
//             }
//         })
//     })
// }

module.exports.getWithParams = function (url, params, req, res) {
    return new Promise((resolve,reject) => {
        request(url, options, function(err, response ,body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}



module.exports.post = function (url, params) {
    var response = request("POST", url,{body : JSON.stringify(params)});
    if (response.statusCode != 200) {
        console.log("response code error");
        console.log(response.getBody("utf8"))
        return null;
    }

    var cookies_arr = response.headers['set-cookie'];
    if (cookies_arr && cookies_arr.length > 0) {
        var cookies = cookie.parse(JSON.stringify(response.headers['set-cookie']));
        for (var c in cookies_arr) {
            var e = cookies_arr[c];
            var e2 = e.split(';');
            for (var i in e2) {
                var arr =  e2[i].split('=');
                var k = arr[0];
                var v = arr[1];
                //console.log('k=' + k + " , v=" + v);
                res.cookie(k,v);
            }
        }   
    }
    
    return JSON.parse(response.getBody("utf8"));
}

// ---- 以下为多个请求汇总 ---
function get(url, params, headers) {
    var deferred = Q.defer();
    //console.log('get url : ' + url + ", params : " + JSON.stringify(params) + ",headers : " + JSON.stringify(headers));
    var response = request("GET", url, { headers: headers, qs: params });

    if (response.statusCode != 200) {
        console("response code error");
        return null;
    }
    var data = response.getBody("UTF-8");
    //console.log(data);
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
