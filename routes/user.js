var http = require('http')
var conf = require(global.root + '/config/api')
var http_proxy = require(global.root + '/utils/API');
var route_base = require(global.root + '/utils/router_base');
var co = require('co');
var request = require('request');
function _user_router(app) {
    app.get("/user/index", function (req, res) {
        try {
            //    var comSer = conf.java_server.host + ":" + conf.java_server.port;
            var comSer = route_base.getRemoteUrl();
            var gradeUrl = comSer + "/website/item/type/3";     //年级
            //    var gradeResp = JSON.parse(http_proxy.get(gradeUrl,null,req,res)).data;
            var subUrl = comSer + "/website/item/type/4";     //科目
            //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
            var provinceUrl = comSer + "/website/item/type/1";     //省份
            //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
            var coachUrl = comSer + "/website/item/type/26";     //辅导性质
            //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
            // TODO　call java
            //    res.render("stu/popularize",{gradeResp:gradeResp,subResp:subResp});
            console.log('start...');

            var p1 = http_proxy.get(gradeUrl, null, req, res, null);
            var p2 = http_proxy.get(subUrl, null, req, res, null);
            var p3 = http_proxy.get(provinceUrl, null, req, res, null);
            var p4 = http_proxy.get(coachUrl, null, req, res, null);
            co(function* () {
                var result = yield [p1, p2, p3, p4];
                // console.log(result);
                var graderesp = JSON.parse(result[0]).data;
                var subjectResp = JSON.parse(result[1]).data;
                var provinceResp = JSON.parse(result[2]).data;
                var coachResp = JSON.parse(result[3]).data;
                res.render('index', { provinceResp: provinceResp, gradeResp: graderesp, subjectResp: subjectResp, coachResp: coachResp });
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {

        }
    })

    app.get("/user/isRegister", function (req, res) {
        try {
            // TODO　call java
            var comSer = route_base.getRemoteUrl();
            var mobile = req.query.mobile;
            var isregUrl = comSer + "/website/parent/is-mobile-registered/" + mobile;  //判断手机号是否注册
            var isregPro = http_proxy.get(isregUrl, null, req, res, null);
            co(function* () {
                var result = yield isregPro;
                var isregResp = JSON.parse(result).data.isRegistered;
                if (isregResp) {
                    return res.json({ code: 0 });
                } else {
                    return res.json({ code: 1 });
                }
            })

        } catch (err) {
            throw err;
        }
    })
    app.get("/user/logined", function (req, res) {  //登录接口
        try {
            // TODO　call java
            var comSer = route_base.getRemoteUrl();
            var mobile = req.query.mobile;
            var pwd = req.query.password;
            var loginUrl = comSer + "/website/parent/login";  //判断手机号是否注册
            var loginPro = http_proxy.get(loginUrl, { mobile: mobile, password: pwd }, req, res, null);
            co(function* () {
                var result = yield loginPro;
                var loginResp = JSON.parse(result);
                if (loginResp.code == 104) {
                    return res.json({ code: 1 });
                } else {
                    return res.json({ code: 0, userId: loginResp.data.user_id });
                }
            })
        } catch (err) {
            throw err;
        }
    })
    app.get("/user/netease", function (req, res) {  //获取用户的accid和token
        try {
            var comSer = route_base.getRemoteUrl();
            // var cookies = req.cookies;
            // TODO　call java
            var neteaseUrl = comSer + "/website/v3/common/account-netease";
            var neteasePro = http_proxy.get(neteaseUrl, null, req, res, null);
            //console.log(neteaseResp);
            co(function* () {
                var result = yield neteasePro;
                var neteaseResp = JSON.parse(result);
                if (neteaseResp.code == 0) {
                    return res.json({ data: neteaseResp.data });
                }
            })

        } catch (err) {
            throw err;
        }
    })
    app.get("/user/infor", function (req, res) {
        try {
            var comSer = route_base.getRemoteUrl();
            var userId = req.query.userId;
            // TODO　call java
            var detailUrl = comSer + "/website/parent/detail/" + userId;
            var detailPro = http_proxy.get(detailUrl, null, req, res, null);
            co(function* () {
                var result = yield detailPro;
                var detailResp = JSON.parse(result);
                if (detailResp.code == 0) {
                    return res.json({ data: detailResp.data });
                }
            })
        } catch (err) {
            throw err;
        }
    })
    app.get('/class', function (req, res) {
        res.render('class', {});
    });
    app.get('/function', function (req, res) {
        res.render('function', {});
    });
    app.get('/computer', function (req, res) {
        res.render('computer', {});
    });
    app.get('/mobile', function (req, res) {
        res.render('mobile', {});
    });
    app.get('/login', function (req, res) {
        res.render('login', {});
    });
    app.get('/register', function (req, res) {
        res.render('register', {});
    });
    app.get('/teacher', function (req, res) {

        res.render('teacher', {});

    });
    app.get('/teacher/getSign', function (req, res) {
        try {
            // TODO　call java
            var comSer = route_base.getRemoteUrl();
            var web_token = req.query.web_token;
            console.log(web_token);
            var getSignUrl = comSer + "/website/sign/getSign?";
            var getSignPro = http_proxy.get(getSignUrl, { "web_token": web_token }, req, res, null);
            co(function* () {
                var result = yield getSignPro;
                return res.json(result);
            })
        } catch (err) {
            throw err;
        }
    })
}

module.exports = _user_router;