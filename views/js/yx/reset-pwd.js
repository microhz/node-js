(function($){
	var showError = function(target, msg){
		$(target).html('<i class="fa fa-times-circle"></i>'+msg);
		$(target).parent('.mod').find('input').addClass('error');
	}

	var checkMobile = function(){
		var mobile = $('.reset-password .mod-mobile input').val();
		if(mobile.length != 11 || !/^[0-9]*$/.test(mobile)){
			showError('.reset-password .mod-mobile .msg', '请输入正确的手机号码');
			return false;
		}
		return true;
	}
	var checkVCode = function(){
		var vcode = $('.reset-password .mod-vcode input').val();
		if(vcode.length == 0){
			showError('.reset-password .mod-vcode .msg', '请输入短信验证码');
			return false;
		}
		return true;
	}
	var checkPassword = function(){
		var password = $('.reset-password .mod-password input').val();
		if(password.length < 6){
			showError('.reset-password .mod-password .msg', '密码的长度至少6位');
			return false;
		}
		return true;
	}

	var checkRePassword = function(){
		var password = $('.reset-password .mod-password input').val();
		var rePassword = $('.reset-password .mod-repassword input').val();
		if(password != rePassword){
			showError('.reset-password .mod-repassword .msg', '两次输入的密码不一致');
			return false;
		}
		return true;
	}

	$('.reset-password .mod .input').on('focus', function(){
		var self = $(this);
		self.removeClass('error');
		self.parent().find('.msg').html('');
		self.addClass('edit');
	});
	$('.reset-password .mod .input').on('blur', function(){
		var self = $(this);
		self.removeClass('edit');
	});
	$('.reset-password .mod-mobile .input').on('blur', function(){
		checkMobile();
	});
	$('.reset-password .mod-vcode .input').on('blur', function(){
		checkVCode();
	});
	$('.reset-password .mod-password .input').on('blur', function(){
		checkPassword();
		checkRePassword();
	});
	$('.reset-password .mod-repassword .input').on('blur', function(){
		checkPassword();
		checkRePassword();
	});

	$('.reset-password .get-vcode').on('click', function(){
		var self = $(this);
		if(self.hasClass('counting')){
			return;
		}
		if(!checkMobile()){
			return;
		}
		var mobile = $('.reset-password .mod-mobile .input').val();
		var url = $('#vcodeUrl').val();
		self.addClass('counting');
		self.html('正在获取验证码...');
		$.get(url, {
			mobile: mobile
		}).success(function(response){
			if(!response.success){
				showError('.reset-password .mod-mobile .msg', response.message);
				self.removeClass('counting');
				self.html('获取短信验证码');
				return;
			}
			self.data('count', 60);
			self.html('60s后可重新获取');
			var timer = setInterval(function(){
				var count = self.data('count') || 60;
				count = count - 1;
				self.data('count', count);
				self.html(count + 's后可重新获取');
				if(count == 0){
					self.removeClass('counting');
					self.html('获取短信验证码');
					clearInterval(timer);
				}
			}, 1000);

		}).fail(function(data){
			showError('.reset-password .mod-mobile .msg', "网络错误，请稍后再试");
			self.removeClass('counting');
			self.html('获取短信验证码');
		})
	});

	$('.reset-password .submit').on('click.submit', function(){
		$('.reset-password .submit-msg').html('');
		var checkers = [checkMobile, checkVCode, checkPassword, checkRePassword];
		var pass = checkers.reduce(function(prev, fn){
			var r = fn();
			return r && prev;
		}, true);
		if(!pass){
			return;
		}
		var url = $('#resetUrl').val();
		var params = {
			mobile: $('.reset-password .mod-mobile .input').val(),
			vcode: $('.reset-password .mod-vcode .input').val(),
			password: $('.reset-password .mod-password .input').val()
		};
		$.post(url, params).success(function(response){
			if(response.success){				
				window.location.href = $('#successUrl').val();
			}else{
				showError('.reset-password .submit-msg', response.message);
			}

		}).fail(function(data){
			showError('.reset-password .submit-msg', "网络错误，请稍后再试");
		});
	});

})(jQuery);