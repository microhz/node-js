var http = require('http')
var conf = require(global.root + '/config/api')
var router_base = require(global.root + '/utils/router_base');
var http_proxy = require(global.root + '/utils/http_utils');
function _user_router(app) {
    // post请求
    // app.post('/login', function (req, res) {
    //     var mobile = req.body.mobile;
    //     var password = req.body.password;
    //     var url = "http://120.26.73.227:8081/website/parent/login";
    //     var resp = http_proxy.get(url, {
    //         mobile : mobile,
    //         password : password
    //     });
    //     res.render('login');
    //     console.log(resp);
    // })

    // app.post('/register', function (req, res) {
    //     var base_url = router_base.getRemoteUrl();
    //     var url = base_url + "/website/parent/add";
    //     var headers = {
    //         Cookie : JSON.stringify(req.cookies)
    //     }
    //     var resp = http_proxy.post(url, req.body, headers);
    //     console.log(resp);
    // })

    // app.post('/addTag', function(req,res) {
    //     var url = "http://127.0.0.1:8080/member-app-web/tag/add";
    //     var res = http_proxy.post(url, req.body);
    //     console.log(res);
    // })

    app.get("/index",function(req,res) {
        try {
            var comSer = conf.java_server.host + ":" + conf.java_server.port;
            var provinceUrl = comSer + "/website/item/type/1";  //省份
            var provinceResp = JSON.parse(http_proxy.get(provinceUrl,null,req,res)).data;
            var gradeUrl = comSer + "/website/item/type/3";     //年级
            var gradeResp = JSON.parse(http_proxy.get(gradeUrl,null,req,res)).data;
            var subjectUrl = comSer + "/website/item/type/4";   //科目
            var subjectResp = JSON.parse(http_proxy.get(subjectUrl,null,req,res)).data; 
            var coachUrl = comSer + "/website/item/type/26";    //辅导性质
            var coachResp = JSON.parse(http_proxy.get(coachUrl,null,req,res)).data;
            res.render('index',{provinceResp:provinceResp,gradeResp:gradeResp,subjectResp:subjectResp,coachResp:coachResp});
        } catch (err) {
            throw err;
        }
      
    })
    app.get("/isRegister",function(req,res) {
        try {
           // TODO　call java
           var mobile = req.query.mobile;
           var comSer = conf.java_server.host + ":" + conf.java_server.port;
            var isregUrl = comSer + "/website/parent/is-mobile-registered/"+mobile;  //判断手机号是否注册
            var isregResp = JSON.parse(http_proxy.get(isregUrl,null,req,res)).data.isRegistered;
            if(isregResp){
                return res.json({code : 0});
            }else{
                return res.json({code : 1});
            }
        } catch (err) {
            throw err;
        }
    })
    app.get("/logined",function(req,res) {  //登录接口
        try {
           // TODO　call java
           var mobile = req.query.mobile;
           var pwd = req.query.password;
           var comSer = conf.java_server.host + ":" + conf.java_server.port;
           var loginUrl = comSer + "/website/parent/login";  //判断手机号是否注册
           var loginResp = JSON.parse(http_proxy.get(loginUrl,{mobile:mobile,password:pwd},req,res));
           console.log(loginResp);
           if(loginResp == 104){
               return res.json({code : 1});
           }else{
                return res.json({code : 0});
           }
        } catch (err) {
            throw err;
        }
    })
    app.get("/netease",function(req,res) {  //获取用户的accid和token
        try {
            var cookies = req.cookies;
           // TODO　call java
           var comSer = conf.java_server.host + ":" + conf.java_server.port;
           var neteaseUrl = comSer + "/website/v3/common/account-netease";  //判断手机号是否注册
            var neteaseResp = JSON.parse(http_proxy.get(neteaseUrl,null ,req, res));
            console.log(neteaseResp);
           
        } catch (err) {
            throw err;
        }
    })
}
module.exports = _user_router;