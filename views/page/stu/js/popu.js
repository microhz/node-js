var source;
$(function(){
    queryParamValue();
    $(".comgrade").on("click",function(){   //弹出遮罩层
        $(".gradeShadow").fadeIn(200);
        $('body').css({
            position: 'fixed',
            top: -document.body.scrollTop + 'px'
        });
        return false;
    })
    $(".gradeShadow").on("click",function(e){  //点击黑色部分遮罩层消失
        if(e.target == e.currentTarget){
            $(this).css("display","none");
            var top = parseInt(document.body.style.top.replace('px'));
            $('body').css({position: 'static'});
            window.scrollTo(0, -top);
        }
    })
    $(".grade-con span").on("click",function(){
        $(".grade").html($(this).html());
        $(".grade").css("color","#4A4D55");
        $(".grade").attr("name",$(this).attr("value"));
        $(".gradeShadow").css("display","none");
        var top = parseInt(document.body.style.top.replace('px'));
        $('body').css({position: 'static'});
        window.scrollTo(0, -top);
    })
    $(".comsub").on("click",function(){   //弹出遮罩层
        $(".subjectShadow").fadeIn(200);
        $('body').css({
        position: 'fixed',
        top: -document.body.scrollTop + 'px'
        });
        return false;
    })
    $(".subjectShadow").on("click",function(e){  //点击黑色部分遮罩层消失
        if(e.target == e.currentTarget){
            $(this).css("display","none");
            var top = parseInt(document.body.style.top.replace('px'));
            $('body').css({position: 'static'});
            window.scrollTo(0, -top);
        }
    })
    $(".sub-con span").on("click",function(){
        $(".subject").html($(this).html());
        $(".subject").css("color","#4A4D55");
        $(".subject").attr("name",$(this).attr("value"));
        $(".subjectShadow").css("display","none");
        var top = parseInt(document.body.style.top.replace('px'));
        $('body').css({position: 'static'});
        window.scrollTo(0, -top);
    })
    $(".cancel").on("click",function(){ //取消按钮
        $(".gradeShadow").fadeOut(200);
        $(".subjectShadow").fadeOut(200);
    })


    $(".getBtn").click(function(){
        var mobile = $(".mobile").val();
        var nickName = $(".name").val();
        var mcode = $(".mcode").val();
        var gradeId = $(".grade").attr("name");
        var subjectId = $(".subject").attr("name");
        if(checkName(nickName) && checkMobile(mobile) && checkCode(mcode) && checkGrade(gradeId) && checkSubject(subjectId)){
            orderClass(mobile,gradeId,subjectId,nickName,mcode);
        }
    })
    $(".mobile").on("input propertychange",function(){
        var mobile = $(this).val();
        isClicked(mobile,$(".mcodeBtn"));
    })
    $(".mcodeBtn").on("click",function(){
        var mobile = $(".mobile").val();
        if(checkMobile(mobile)){
            getmcode(mobile,$(this));
        }
    })
})
//预约试听课
function orderClass(mobile,gradeId,subjectId,nickName,mcode){
    $.ajax({
        type:"post",
        url:"/add",
        data:{mobile:mobile,gradeId:gradeId,subjectId:subjectId,nickName:nickName,parentId:null,comment:"",source:source,verifyCode:mcode},
        success:function(data){
            console.log(data);
           
        }
    });
}
//获取手机验证码
function getmcode(mobile,obj){
    $.ajax({
        type:"get",
        url:"/getcode",
        data:{mobile:mobile},
        success:function(data){
            console.log(data);
            if(data.code == 1){
                webToast("获取验证码失败","middle",2000);
            }else{
                settime(obj);  //倒计时
            }
        }
    });
}
//倒计时函数
var countdown=60; 
function settime(obj) { 
    if (countdown == 0) { 
        $(".mcodeBtn").removeAttr("disabled");
        obj.css("background-color","#35CBDB");
        obj.html("获取验证码"); 
        countdown = 60; 
        return;
    } else { 
        obj.html(countdown + "s后重新获取"); 
        countdown--; 
        obj.attr("disabled","disabled");
        obj.css("background-color","#9ee6ee");
    } 
    setTimeout(function() { 
        settime(obj) }
        ,1000) 
}
function isClicked(mobile,obj){
    if(mobile){
        obj.removeAttr("disabled");
        obj.css("background","#35CBDB");
    }else{
        obj.attr("disabled","disabled");
        obj.css("background","#9EE6EE");
    }
}
function checkName(nickName){
    var patrn = /^\s*[\u4e00-\u9fa5]{2,10}\s*$/;
    if(!(patrn.test(nickName))){
        webToast("姓名必须为2-10个中文字符","middle",2000);
        return false;
    }
    return true;
}
function checkMobile(mobile){
    var patrn = /^1[34578]\d{9}$/;
    if(!(patrn.test(mobile))){
        webToast("请输入正确格式的手机号码","middle",2000);
        return false;
    }
    return true;
}
function checkCode(mcode){
    if(mcode == ""){
        webToast("请输入手机验证码","middle",2000);
        return false;
    }
    return true;
}
function checkGrade(grade){
    if(!grade){
        webToast("请选择年级","middle",2000);
        return false;
    }
    return true;
}
function checkSubject(subject){
    if(!subject){
        webToast("请选择科目","middle",2000);
        return false;
    }
    return true;
}
//截取source
function getRequestParams() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&"); 
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
    }
    }
    return theRequest;
}
function queryParamValue(){
    var requestParams = getRequestParams();
    source = requestParams.source ? requestParams.source : "";
}