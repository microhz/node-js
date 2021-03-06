var http = require('http')
var http_utils = require('../utils/http_utils')
var conf = require('../config/api')
var host = conf.java_server.host;
var port = conf.java_server.port;
module.exports = function (app) {
    // get请求
    app.get('/',function(req,res) {
        // get请求
        var get_params = req.query;
        console.log(JSON.stringify(get_params));
        // 第二种获取方式
        console.log(JSON.stringify(req.params));
    })

    app.post('/',function(req,res) {
        // post请求
        var post_params = req.body;l
        console.log(JSON.stringify(post_params));
        res.render("users/demo", {title : "this is title data"});
    })

    app.post('/test',function(req,res) {
        // post
        console.log(req.query);
        console.log(req.body);
    })

    // 访问后端
    app.get('/testGet',function(req,res) {
        // 校验下参数
        // 参数正常请求后端
        http.get(host + ":" + port + "/website/item/type/3",function(request, response) {
            var data = "";
            request.on('data',function(chunk){
                data += chunk;
                res.render('users/demo', {data :data});
            });
        })
    })

    app.post('/testPost',function(req,res) {
        http.post("http://120.26.73.227:8081/website/item/type/3",function(request,response) {

        })
    })

    app.get('/guide', function(req,res) {
        // res.render('jyxb-guide', {test: "value"});
        try {
            http_utils.get("http://120.26.73.227:8081/website/item/type/3",null,req,res,"users/demo");
            throw err;
        } catch (err) {
            console.log(err.stack);
        }
        
    })

    app.get('/test-vue', function(req,res) {
        
    })
}