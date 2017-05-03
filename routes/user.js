var http = require('http')
var conf = require('../config/api')
var router_base = require('../utils/router_base');
var request = require('sync-request');
function _user_router(app) {
    // get请求
    app.get('/login', function (req, res) {
        res.render('login');
    })

    app.get('/index', function (req, res) {
        var base_url = router_base.getRemoteUrl();
        var ret = request('GET', base_url + "/website/item/type/3?_=1493712332461");
        console.log(ret.getBody("UTF-8"));
    })
}
module.exports = _user_router;