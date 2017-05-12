$(function(){
    $(".search-teacher").on("click",function(){
        var uname = $(".stu-name").val();
        var provinceId = $("#province").find("option:selected").attr("value");
        var gradeId = $("#grade").find("option:selected").attr("value");
        var subjectId = $("#subject").find("option:selected").attr("value");
        var sexId = $("input:radio[name='sex']:checked").attr("value");
        var natureId = $("input:radio[name='time']:checked").attr("value");
        var remark = $("#remark").val();
        if(checkName(uname,$(".error-name")) && checkProvince(provinceId) && checkGrade(gradeId) && checkSubject(subjectId) && checkSex(sexId,$(".error-sex")) && checkNature(natureId,$(".error-time"))){
            $(".hintShadow").slideDown("200"); //弹窗出现
            $(".hintCon").css("display","block").siblings().css("display","none");
			$(".hintMobile").val("");
            $("body").css("overflow","hidden");

            $(".hintClose").click(function(){  //弹窗消失
                $(".hintShadow").slideUp("300"); 
                $(".hintCon").css("display","block").siblings().css("display","none");
                $("body").css("overflow","auto");
                $(".search-teacher").css("background","#35CBDB");
            })

            $('.hintMobile').bind('input propertychange',function(){
                var mobile = $(this).val();
                if(mobile.length == 11 && /^[0-9]*$/.test(mobile)){
                    $("#next").removeAttr("disabled");
                    $("#next").css("background-color", "#35CBDB");
                    $("#next").on("click.submit",function(){
                        if(!(/^1[34578]\d{9}$/.test(mobile))){
                            $(".reminder").html("手机号格式不正确");
                        }else{
                            isRegiste(mobile,uname,provinceId,gradeId,subjectId,sexId,natureId,remark);
                        };
                    })
                }else{
                    $("#next").css("background-color", "#9ee6ee"); 
                    $("#next").off("click.submit");
                }
            })
        }
    });
})
function isRegiste(mobile,uname,provinceId,gradeId,subjectId,sexId,natureId,remark){
	$.ajax({
		type:"get",
		url:"/isRegister?mobile="+mobile,
		success:function(data){
            if(data.code == 0){
                $(".logCon").css("display","block").siblings().css("display","none");
			    $(".logUser").html(mobile); 
                //返回按钮
				$(".regBack").on("click",function(){
					back(mobile);
				});
				$(".logSure").on("click.loginevent",function(){
					var pwd = $(".logPwd").val();
					//调用登录接口
					dylogin(mobile,pwd,uname,gradeId,subjectId,natureId,remark);
				})
            }else{

            }
        }
    })
}
//返回按钮
function back(mobile){
	$(".hintCon").css("display","block").siblings().css("display","none");
	$(".hintMobile").val(mobile);
}
function dylogin(mobile,pwd,uname,gradeId,subjectId,natureId,remark){
    $.ajax({
		type:"get",
		url:"/logined",
		data:{mobile:mobile,password:pwd},
		success:function(data){
            console.log(data);
            if(data.code == 0){
                $(".lpwdinfor").html("");
				//移除登录事件
				$(".logSure").off("click.loginevent");
				$(".logSure").css("background-color","#76DCE7");
				$(".logSure").html("登录中...");
                // var userId = data.data.user_id;
                //获取用户的accid和token
				getInfor();
            }else{
                $(".lpwdinfor").html("请输入正确密码");
            }
        }
    })
}
//获取用户的accid和token
function getInfor(){
	$.ajax({
		type:"get",
		url:"/netease",
		success:function(data){
			
		}
	});
}