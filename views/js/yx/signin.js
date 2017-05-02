(function($) {

	if(localStorage){
		var mobile = localStorage.getItem("mobile");
		if (mobile) {
			$('.sign-in-body .form .mobile').val(mobile);
		};
	}

	var showError = function(msg){
		$('.sign-in-body .form .msg').html('<i class="fa fa-times-circle"></i>'+msg);
		setTimeout(function(){
			$('.sign-in-body .form .msg').html('');
		}, 2000);
	}

    $('.sign-in-body .form input').on('focus', function() {
        var self = $(this);
        self.addClass('focus');
    });
    $('.sign-in-body .form input').on('blur', function() {
        var self = $(this);
        self.removeClass('focus');
    });

    $('.sign-in-body .form .sign-in').on('click.signin', function() {
        var mobile = $('.sign-in-body .form .mobile').val();
        var password = $('.sign-in-body .form .password').val();
        if (mobile.length != 11 || !password) {
            showError('请输入正确的手机号和密码！');
            return;
        }
        var url = $('#signInUrl').val();
        $.post(url, {
            mobile: mobile,
            password: password
        }).success(function(response) {
        	if(response.success){
        		if(localStorage){
					localStorage.setItem("mobile", mobile);
				}
        		window.location.href = $('#successUrl').val();
        	}else{
        		showError(response.message);
        	}
        	
        }).fail(function(data) {
        	showError('网络错误请稍后再试');
        });
    });
})(jQuery);