var http = require('http')
var conf = require(global.root + '/config/api')
var router_base = require(global.root + '/utils/router_base');
var request = require('sync-request');
var http_proxy = require(global.root + '/utils/http_utils');
function _user_router(app) {
    // post请求
    app.post('/login', function (req, res) {
        var mobile = req.body.mobile;
        var password = req.body.password;
        var url = "http://120.26.73.227:8081/website/parent/login";
        var resp = http_proxy.post(url, {
            mobile : mobile,
            password : password
        });
        console.log(resp);
    })

    app.get('/index', function (req, res) {
        var base_url = router_base.getRemoteUrl();
        var url = base_url + "/website/item/type/3?_=1493712332461";
        var resp = http_proxy.get(url);
        console.log(resp);
    })
}
module.exports = _user_router;