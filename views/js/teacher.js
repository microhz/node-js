$(function(){
	
//=============	楼梯效果  ==============
	//鼠标点击
	var mark = 1;
	$(".slideNav .slide").click(function() {
		mark = 2; //改变标记
		$(".slideNav .slide").removeClass("active")
		$(this).addClass("active");
		//点击右边导航 然后跳到指定的楼层
		var $index = $(this).index(); //找到了对应的序列号
		var $top = $(".main .stairs").eq($index).offset().top; //获取制定Louti与浏览器上面的距离
		//alert($top);
		$("body,html").animate({
			scrollTop: $top
		}, 500, function() {
			mark = 1;
		}); //浏览器滚动的高度
	});
	
 	//浏览器串口滚动事件
	$(window).scroll(function() {
		if (mark == 1) {
			var $t = $(this).scrollTop(); //获取滚动条滚动的高度
			//document.title = $t;
			if ($t > 289) { //通过滚动条来判断
				$(".slideNav").fadeIn(); //淡入 导航慢慢显示出来
			} else {
				$(".slideNav").fadeOut(); //淡出 导航慢慢消失
			}
			var $obj = $(".main .stairs");
			//循环每一个楼梯  然后找到最先满足条件的那个 楼梯
			$obj.each(function() {
				var $index = $(this).index();
				//楼层与浏览器上面的高度
				var $height = $obj.eq($index).offset().top + $(this).height() / 5;
				//alert($height) 
				if ($t < $height) {
					$(".slideNav .slide").removeClass("active")
					$(".slideNav .slide").eq($index).addClass("active");
					return false;
				}
			});
		}
	});
	
//=============	点击弹出视频  ==============	
	$(".video-view").click(function(){
		$(".mask-view").css("display","block");
		$(".mask-close").click(function(){
			$(".mask-view").css("display","none");
		})
	})
	
})