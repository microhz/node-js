var http = require('http')
var conf = require(global.root + '/config/api')
var router_base = require(global.root + '/utils/router_base');
var http_proxy = require(global.root + '/utils/API');
var route_base = require(global.root + '/utils/router_base');
var co = require('co');
var request = require('request');
function _pop_router(app) {
    
    app.get("/pop",function(req,res) {
        try {
        //    var comSer = conf.java_server.host + ":" + conf.java_server.port;
            var comSer = route_base.getRemoteUrl();
           var gradeUrl = comSer + "/website/item/type/3";     //年级

         var g1 =  http_proxy.get(gradeUrl,null,req,res)


        //    var gradeResp = JSON.parse(http_proxy.get(gradeUrl,null,req,res)).data;
           var subUrl = comSer + "/website/item/type/4";     //科目
        //    var subResp = JSON.parse(http_proxy.get(subUrl,null,req,res)).data;

        var g2 = http_proxy.get(subUrl,null,req,res)
           // TODO　call java
        //    res.render("stu/popularize",{gradeResp:gradeResp,subResp:subResp});
        console.log('start...');

        // async
        var a = request.get(gradeUrl);
        var b = request.get(subUrl);

        
        // co(function *() {
        //     request.get(gradeUrl, function*(err, response, body) {
        //         return yield body;
        //     });
        // }).then(function(data) {
        //     console.log(data);
        // });


        // var a = new Promise(function(resolve, reject) {
        //     request.get(gradeUrl, function(err, response ,body) {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(body);
        //             console.log(body);
        //         }
        //     });
        // })

        var p1 = http_proxy.get(gradeUrl,null,req,res);
        var p2 = http_proxy.get(subUrl,null,req,res);
        co(function *() {
            var result = yield [p1,p2];
            console.log(result);
            res.send(result);
        }).catch (err => {
            console.log(err);
        })
        console.log("test");


        // var n1 = g1.next();
        // var n2 = g2.next();

        console.log('test22...');
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