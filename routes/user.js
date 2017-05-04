var http = require('http')
var conf = require(global.root + '/config/api')
var router_base = require(global.root + '/utils/router_base');
var http_proxy = require(global.root + '/utils/http_utils');
function _user_router(app) {
    // post请求
    app.post('/login', function (req, res) {
        var mobile = req.body.mobile;
        var password = req.body.password;
        var url = "http://120.26.73.227:8081/website/parent/login";
        var resp = http_proxy.get(url, {
            mobile : mobile,
            password : password
        });
        res.render('login');
        console.log(resp);
    })

    app.post('/register', function (req, res) {
        var base_url = router_base.getRemoteUrl();
        var url = base_url + "/website/parent/add";
        var headers = {
            Cookie : JSON.stringify(req.cookies)
        }
        var resp = http_proxy.post(url, req.body, headers);
        console.log(resp);
    })

    app.post('/addTag', function(req,res) {
        var url = "http://127.0.0.1:8080/member-app-web/tag/add";
        var res = http_proxy.post(url, req.body);
        console.log(res);
    })
}
module.exports = _user_router;