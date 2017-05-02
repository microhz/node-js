var http = require('http')
module.exports = function (app) {
    // get请求
    app.get('/login',function(req,res) {
        res.render('page/login');
    })

    app.get('/index',function(req,res) {
        // res.render('page/index');
        http.get("http://www.jiayouxueba.com/website/item/type/3?_=1493712332461",function(request, response) {
            var data = "";
            request.on('data',function(chunk){
                data += chunk;
                res.render('page/index', {subject : data});
            });
        })
    })
}