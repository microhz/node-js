/**
 * 主要业务逻辑相关
 */
var userUID = readCookie("uid")
/**
 * 实例化
 * @see module/base/js
 */

var account = readCookie("account");
var scene = readCookie("scene");
var accid = readCookie("accid");

var yunXin = new YX(userUID, todoFunc)


function todoFunc(){
	yunXin.openChatBox(accid,scene);
	loadInfo();
}



function loadInfo() {
	$.ajax({
		type:"get",
		url:"/website/scholar/detail/"+account,
		success:function(data){
			console.log(data.data);
			$("#nickName").html(data.data.name);
			$(".kemu").html(data.data.preferSubjects[0]);
			$(".avgprice em").html(data.data.priceOnline);
			$("#headImg").attr("src",data.data.portraitUrl);
		}
	});
}
