$(function(){
	var localValue = JSON.parse(localStorage.getItem("user"));
//	console.log(localValue);
	
	if(localValue != null){
		showLoginName();
	}
	
	//点击退出登录按钮,退出登录并返回首页
	$(".tuichu").click(function(){
		$.ajax({
			type:"post",
			url:"/website/parent/logout",
			success:function(data){
	//			console.log(data);
				localStorage.removeItem("user");
				$(".stu-login").css("display","block");
				$(".stu-logined").css("display","none");
			}
		});
	})
	
	//点击登录跳转到登录界面
	$(".denglu").click(function(){
		window.location = "login.html";
	})
	//点击注册跳转到注册界面
	$(".zhuce").click(function(){
		window.location = "register.html";
	})
	
	//点击找老师返回最近的界面
	var temp = sessionStorage.getItem("temp");
//	console.log(temp);
	$(".findteacher").click(function(){
		
		if(temp == "true"){
			window.location = "index.html";
		}else if(temp == "false"){
			window.location = "bill.html";
		}
		if(temp == null){
			window.location = "index.html";
		}
	})
})

//获取存入的用户名显示在登录按钮上
function showLoginName(){
	var _name = JSON.parse(localStorage.getItem("user"));
	$(".stu-login").css("display","none");
	$(".stu-logined").css("display","block");
	//console.log(_name.userName);
	$(".stu-logined span").html(_name.userName);
	//限制字符个数   超过三个显示省略号
	$(".stu-logined span").each(function(){
		var maxwidth=3;
		if($(this).text().length>maxwidth){
			$(this).text($(this).text().substring(0,maxwidth));
			$(this).html($(this).html()+'…');
		}
	});
}