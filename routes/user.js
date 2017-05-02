var http = require('http')
var conf = require('../config/api')
var router_base = require('../utils/router_base');

function _user_router(app) {
    // get请求
    app.get('/login',function(req,res) {
        res.render('login');
    })

    app.get('/index',function(req,res) {
        var base_url = router_base.getRemoteUrl();
        http.get(base_url + "/website/item/type/3?_=1493712332461",function(request, response) {
            var data = "";
            request.on('data',function(chunk){
                data += chunk;
                // var subject_array = JSON.parse(data).data;
                res.render('index');
            });
        })
    })
}
module.exports = _user_router;