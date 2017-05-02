(function($) {
    $.ajaxSetup({cache:false});
    var selectedGrade = function(){
        var grade = $('.student-sign-up .mod-grade .select-grade .grade');
        var selected = $('.student-sign-up .mod-grade .select-grade .grades .selected');

        grade.data('grade-id', selected.find('a').data('grade-id'));
        grade.html(selected.find('a').html());
    }

    var showError = function(selector, msg){
    	$(selector).html('<i class="fa fa-times-circle"></i>' + msg);
    	$(selector).parent().find('input').addClass('error');
    }

    var clearError = function(selector){
        $(selector).find('input').removeClass('error');
        $(selector).find('.msg').html('');
    }

    var checkMobile = function(){
    	var mobile = $('.student-sign-up .mobile').val();

    	if(mobile.length != 11 || !/^[0-9]*$/.test(mobile)){
    		showError('.student-sign-up .mobile-mod .msg', '请输入正确的手机号码');
    		return false;
    	}
    	return true;
    }

    var checkACode = function(){
        var vcode = $('.student-sign-up .acode').val();
        if (vcode.length == 0) {
            showError('.student-sign-up .acode-mod .msg', '请输入图片校验码');
            return false;
        };
        return true;
    }

    var checkVCode = function(){
    	var vcode = $('.student-sign-up .vcode').val();
    	if (vcode.length == 0) {
    		showError('.student-sign-up .vcode-mod .msg', '请输入短信校验码');
    		return false;
    	};
    	return true;
    }
    var checkName = function(){
    	var name = $('.student-sign-up .name').val();
    	if (name.length == 0) {
    		showError('.student-sign-up .name-mod .msg', '请输入您的昵称');
    		return false;
    	};
    	if (name.length > 15) {
    		showError('.student-sign-up .name-mod .msg', '您的昵称太长了，请重新设置');
    		return false;
    	};
    	return true;
    }

    var checkPassword = function(){
    	var password = $('.student-sign-up .pwd-mod .pwd').val();
    	if (password.length < 6) {
    		showError('.student-sign-up .pwd-mod .msg', '密码长度需至少6位');
    		return false;
    	};
    	return true;
    }

    var checkRePwd = function(){
    	var password = $('.student-sign-up .pwd-mod .pwd').val();
    	var repassword = $('.student-sign-up .repwd-mod .pwd').val();
    	if (password != repassword) {
    		showError('.student-sign-up .repwd-mod .msg', '两次密码不一致，请重新输入');
    		return false;
    	};
    	return true;
    }
    
    var checkGrade = function(){
    	var grade = $('.student-sign-up .mod-grade .select-grade .grade');

        var id = grade.data('grade-id');
    	if(!id){
    		showError('.student-sign-up .mod-grade .msg', '请选择您的年级');
    		return false;
    	}
    	return true;
    }

    selectedGrade();

    $('.student-sign-up input').on('focus', function() {
        var self = $(this);
        self.removeClass('error');
        self.parent().find('.msg').html('');
        self.addClass('edit');
    });
    $('.student-sign-up input').on('blur', function() {
        var self = $(this);
        self.removeClass('edit');
    });

    $('.student-sign-up .mobile-mod input').on('blur', function(){
		var self = $(this);
		if (!checkMobile()) {
			return;
		};
	});

	$('.student-sign-up .name-mod input').on('blur', function(){
		var self = $(this);
		if (!checkName()) {
			return;
		};
	});

    $('.student-sign-up .vcode-mod input').on('blur', function(){
		var self = $(this);
		if (!checkVCode()) {
			return;
		};
	});

    $('.student-sign-up .pwd-mod input').on('blur', function(){
		var self = $(this);
		checkPassword();
		checkRePwd();
	});

	$('.student-sign-up .repwd-mod input').on('blur', function(){
		checkPassword();
		checkRePwd();
	});
	/*
    $('.student-sign-up .mod-grade .select-grade').on('click', function(){
        var self = $(this);
        var grades = self.find('.grades');
        if(grades.hasClass('show')){
            grades.removeClass('show');
            grades.hide();
        }else{
            grades.addClass('show');
            grades.show();
        }
    });
    */
	
	$('.student-sign-up .mod-grade .grades .item a').on('click', function(event){
		event.preventDefault();
		var self = $(this);
		$('.student-sign-up .mod-grades .msg').html('');
		
		self.parents('.grades').find('.item').removeClass('selected');
		self.parent().addClass('selected');

        selectedGrade();
		
		return false;
	});

    $('.student-sign-up .acode-mod .change-acode').on('click.change-acode', function(event){
        event.preventDefault();
        function chgUrl(url) {
            var timestamp = (new Date()).valueOf();
            url = url + "?timestamp=" + timestamp;
            return url;
        }
        var self = $(this);
        var image = self.parent('.student-sign-up .acode-mod').find('.acode-img');
        var src = self.data('src');
        image.attr("src", chgUrl(src))
    });

    $('.student-sign-up .get-code').on('click.vcode', function(event) {
        clearError('.student-sign-up .mobile-mod');
        clearError('.student-sign-up .acode-mod');
    	event.preventDefault();
        var self = $(this);
        if(self.hasClass('counting')){
        	return;
        }
        if(!checkMobile() || !checkACode()){
        	return;
        }
        var mobile = $('.student-sign-up .mobile').val();
        var acode = $('.student-sign-up .acode').val();
        var url = $('#vcodeUrl').val();
        self.addClass('counting');
        self.html('正在获取短信校验码...');
        $.get(url, {
            mobile: mobile,
            acode: acode
        }).success(function(response) {
        	if(response.success){
        		self.data('count', 60);
        		var counting = setInterval(function(){
        			var count = +self.data('count') || 60;
        			count = count - 1;
        			self.data('count', count);
                    self.html('60s后可重新获取');
        			if(count == 0){
        				clearInterval(counting);
        				self.removeClass('counting');
        				self.html('免费获取短信校验码');
        			}else{
        				self.html(count + 's后可重新获取');
        			}
        		}, 1000);
        	}else{
        		self.removeClass('counting');
        		self.html('免费获取短信校验码');
                if (response.code == "ae") {
                    showError('.student-sign-up .acode-mod .msg', "图片校验码错误");
                }else{
        		  showError('.student-sign-up .mobile-mod .msg', response.message);
                }
                $('.student-sign-up .acode-mod .change-acode').trigger('click');
        	}
        }).fail(function(data){
        	self.removeClass('counting');
        	self.html('免费获取短信校验码');
        	showError('.student-sign-up .mobile-mod .msg', '网络错误，请稍后重试');
        });
    });

	$('.student-sign-up .submit').on('click.submit', function(event){
		event.preventDefault();
		$('.student-sign-up .submit-msg').html('');
		var checkers = [checkMobile, checkVCode, checkName, checkPassword, checkRePwd, checkGrade];
		var result = checkers.reduce(function(prev, current){
			var r = current();
			return r && prev;
		}, true);

		if(!result){
			return;
		}
		var params = {
			mobile: $('.student-sign-up .mobile').val(),
			vcode:$('.student-sign-up .vcode').val(),
			password:$('.student-sign-up .pwd').val(),
			name: $('.student-sign-up .name').val(),
			grade: $('.student-sign-up .mod-grade .select-grade .grade').data('grade-id')
		};
		var url = $('#sginUpUrl').val();
		console.log(params);
		$.post(url, params).success(function(response){
			if (!response.success) {
				$('.student-sign-up .submit-msg').html('<i class="fa fa-times-circle"></i>' + response.message);
                $('.student-sign-up .acode-mod .change-acode').trigger('click');
			}else{
				var successUrl = $('#successUrl').val();
				window.location.href= successUrl;
			}
		}).fail(function(data){
			$('.student-sign-up .submit-msg').html('<i class="fa fa-times-circle"></i>网络错误，请稍后重试');
		});
	});

})(jQuery);