
$(document).ready(function() {

	$.fn.fullpage({

		slidesColor: ['#35cbdb', '#f6f6f6', '#f6f6f6', '#f6f6f6','#f6f6f6'],

		anchors: ['page1', 'page2', 'page3', 'page4','page5'],

		navigation: true,
		
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$("#fullPage-nav li .active span").addClass(".first_active");
				$("#fullPage-nav span").addClass("first_normal");
				$(".footer p").css("color","#fff");
			}
			if(index == 2 || index == 3 || index == 4 || index == 5){
				$("#fullPage-nav li .active span").addClass("notfirst_active");
				$("#fullPage-nav span").addClass("notfirst_normal");
				$("#fullPage-nav li .active span").removeClass("first_active");
				$("#fullPage-nav span").removeClass("first_normal");
				$(".footer p").css("color","#a8aaac");
			}
		}

	});

	
	$(window).resize(function(){
	   $('.wrapper img').height($(window).height() - $('.header').height() - $('.footer p').height() );
//		console.log(1)
		$(".section-one .wrapper .btn").width(($(".section-one .wrapper .btn").height())*(270/120));
		$(".section-two .wrapper .btn").width(($(".section-two .wrapper .btn").height())*(112/36));
		$(".section-three .wrapper .btn").width(($(".section-three .wrapper .btn").height())*(112/36));
		$(".section-four .wrapper .btn").width(($(".section-four .wrapper .btn").height())*(112/36));
		$(".section-five .wrapper .btn").width(($(".section-five .wrapper .btn").height())*(112/36));
		location.reload();
	});
	$(".section-one .wrapper .btn").width(($(".section-one .wrapper .btn").height())*(270/120));
	$(".section-two .wrapper .btn").width(($(".section-two .wrapper .btn").height())*(112/36));
	$(".section-three .wrapper .btn").width(($(".section-three .wrapper .btn").height())*(112/36));
	$(".section-four .wrapper .btn").width(($(".section-four .wrapper .btn").height())*(112/36));
	$(".section-five .wrapper .btn").width(($(".section-five .wrapper .btn").height())*(112/36));
});
