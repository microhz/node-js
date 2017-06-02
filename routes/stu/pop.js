var http = require('http')
var conf = require(global.root + '/config/api')
var http_proxy = require(global.root + '/utils/API');
var route_base = require(global.root + '/utils/router_base');
var co = require('co');
var request = require('request');
function _pop_router(app) {  
    app.get("/index",function(req,res) {
        try {
        //    var comSer = conf.java_server.host + ":" + conf.java_server.port;
        var comSer = route_base.getRemoteUrl();
        var gradeUrl = comSer + "/website/item/type/3";     //年级
        //    var gradeResp = JSON.parse(http_proxy.get(gradeUrl,null,req,res)).data;
        var subUrl = comSer + "/website/item/type/4";     //科目
        //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
        var provinceUrl =  comSer + "/website/item/type/1";     //省份
        //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
        var coachUrl = comSer + "/website/item/type/26";     //辅导性质
        //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;
           // TODO　call java
        //    res.render("stu/popularize",{gradeResp:gradeResp,subResp:subResp});
        console.log('start...');

        var p1 = http_proxy.get(gradeUrl,null,req,res,null);
        var p2 = http_proxy.get(subUrl,null,req,res,null);
        var p3 = http_proxy.get(provinceUrl,null,req,res,null);
        var p4 = http_proxy.get(coachUrl,null,req,res,null);
        co(function *() {
            var result = yield [p1,p2,p3,p4];
            // console.log(result);
            var graderesp = JSON.parse(result[0]).data;
           var subjectResp = JSON.parse(result[1]).data;
           var provinceResp = JSON.parse(result[2]).data;
           var coachResp = JSON.parse(result[3]).data;
            res.render('index',{provinceResp:provinceResp,gradeResp:graderesp,subjectResp:subjectResp,coachResp:coachResp});
        }).catch (err => {
            console.log(err);
        })

        // var n1 = g1.next();
        // var n2 = g2.next();
        } catch (err) {
            throw err;
        }
    })
   app.get("/getcode",function(req,res) {
        try {
           var mobile = req.query.mobile; 
           var comSer = conf.java_server.host + ":" + conf.java_server.port;
           var mcodeUrl = comSer + "/api/v3/sms/white-list/getcode";     //获取验证码
           var mcodeResp = JSON.parse(http_proxy.get(mcodeUrl,{mobile:mobile},req,res));
           console.log(mcodeResp);
           if(mcodeResp.code == 0){
                return res.json({code:mcodeResp.data});
           }else{
                return res.json({code:1});
           }
           // TODO　call java
        } catch (err) {
            throw err;
        }
    })

    app.post("/add",function(req,res) {
        try {
            console.log(req);
           var mobile = req.body.mobile;
           var gradeId = req.body.gradeId;
           var subjectId = req.body.subjectId;
           var source = req.body.source;
           var nickName = req.body.nickName;
           var parentId = req.body.parentId;
           var comment = req.body.comment;
           var verifyCode = req.body.verifyCode;
           var comSer = conf.java_server.host + ":" + conf.java_server.port;
           var addUrl = comSer + "/api/trial-course/add";     //预约试听课
           var addResq = http_proxy.post(addUrl,{mobile:mobile,gradeId:gradeId,subjectId:subjectId,nickName:nickName,parentId:null,comment:null,source:null,verifyCode:verifyCode});
           console.log(addResq);
           // TODO　call java
        } catch (err) {
            throw err;
        }
    })
}
module.exports = _pop_router;