var http = require('http')
var conf = require('../config/api')
var router_base = require('../utils/router_base');

function _user_router(app) {
    // get请求
    app.get('/login',function(req,res) {
        res.render('page/login');
    })

    app.get('/index',function(req,res) {
        var base_url = router_base.getRemoteUrl();
        var vue = new vue({
            el : "app",
            data : {
                test : "hell"
            }
        });
        http.get(base_url + "/website/item/type/3?_=1493712332461",function(request, response) {
            var data = "";
            request.on('data',function(chunk){
                data += chunk;
                res.render('page/index', {subject : data});
            });
        })
    })
}
module.exports = _user_router;