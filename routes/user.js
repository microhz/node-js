var http = require('http')
var conf = require(global.root + '/config/api')
var router_base = require('../utils/router_base');
var request = require('sync-request');
var http_proxy = require('../utils/http_utils');
function _user_router(app) {
    // get请求
    app.get('/login', function (req, res) {
        res.render('login');
    })

    app.get('/index', function (req, res) {
        var base_url = router_base.getRemoteUrl();
        var url = base_url + "/website/item/type/3?_=1493712332461";
        var resp = http_proxy.get(url);
        console.log(resp);
    })
}
module.exports = _user_router;