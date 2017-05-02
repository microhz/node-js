var http = require('http')
var http_utils = require('../utils/http_utils')
var conf = require('../config/api')
var host = conf.java_server.host;
var port = conf.java_server.port;
module.exports = function (app) {
    // get请求
    app.get('/login',function(req,res) {
        res.render('users/login');
    })
}