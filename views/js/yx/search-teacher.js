(function($) {

	var obj2List = function(obj) {
		var params = [];
		$.each(obj, function(key, value) {
			if (value !== "") {
				params.push(key + "=" + value);
			}
		});
		return params;
	}

	var retriveSearchParams = function(fields) {
		var obj = {};
		fields.each(function(index, value) {
			var self = $(this)
			obj[self.data('search-key')] = self.data('search-value');
		});

		return obj;
	}

	var collectSnParams = function() {
		var selected = $('.sn-area .selected a[data-search-key]');
		return retriveSearchParams(selected);
	}

	var collectCityParams = function() {
		var selected = $('#logoBar div[data-search-key]');

		return retriveSearchParams(selected);
	}

	var collectPageParams = function() {

		var selected = $('.pager .pages .selected a[data-page]');

		return {
			"page" : (+selected.data("page") || 1)
		};
	}

	var collectQueryParams = function() {
		var input = $('#logoBar .mod-search input[data-search-query]');

		var query = input.val();

		return {
			"query" : query
		};
	}
	var collectSortParams = function() {
		var sort = $('.sn-sort .selected a[data-search-sort]');

		var sortBy = sort.data('search-sort');

		var asc = sort.data('search-asc');

		var params = {};
		if (sortBy !== "") {
			params['sortBy'] = sortBy;
		}
		if (asc) {
			params['asc'] = asc;
		}

		return params;

	}

	var collectParams = function(fns) {

		var v = fns.map(function(fn) {
			return fn();
		}).map(function(value) {
			var arr = obj2List(value);
			return arr;
		}).reduce(function(prev, cur) {
			return prev.concat(cur);
		}, []);
		
		var s = v.join('&');
		
		return encodeURI(s);

	}

	var getPageUrl = function() {
		var url = location.host + location.pathname;
		if(!/^http:\/\//.test(url)){
			url = "http://"+url;
		}
		return url;
	}

	$('.sn-area a[data-search-key]')
			.on(
					'click.go',
					function(event) {
						event.preventDefault();
						var self = $(this);
						self.parents('.sn-area').find('.sn-item').removeClass(
								'selected');
						
						self.parent('.sn-item').addClass('selected');
						var params = collectParams([ collectSnParams,
								collectCityParams, collectPageParams,
								collectQueryParams, collectSortParams ]);
						
						var url = getPageUrl() + "?" + params;
						//console.log(url);
						
						url = encodeURI(url);
						
						window.location.href = url;
						
						return false;
					});
	/*
	$('#logoBar .mod-search .do-search').on('click.search', function(event) {

		event.preventDefault();

		var params = collectParams([ collectCityParams, collectQueryParams ]);

		var url = getPageUrl() + "?" + params;
		
		url = encodeURI(url);
		
		window.location.href = url;
		return false;
	});
	
	$('#logoBar .mod-search .query').on('keydown', function(event){
		if(event.keyCode == 13){
			var params = collectParams([ collectCityParams, collectQueryParams ]);

			var url = getPageUrl() + "?" + params;
			
			url = encodeURI(url);
			
			window.location.href = url;
		}
	});
	*/

	$('.pager .pages a[data-page]').on(
			'click.page',
			function(event) {
				event.preventDefault();
				var self = $(this);
				var parent = self.parent('.page');
				if (parent.hasClass('disable')) {
					return;
				}

				self.parents('.pages').find('.page').removeClass('selected');
				self.parent('.page').addClass('selected');
				var params = collectParams([ collectSnParams,
						collectCityParams, collectPageParams,
						collectQueryParams, collectSortParams ]);

				var url = getPageUrl() + "?" + params;
				
				url = encodeURI(url);
				
				window.location.href = url;
				return false;
			});

	$('.sn-sort a[data-search-sort]').on(
			'click.sort',
			function(event) {
				event.preventDefault();
				var self = $(this);
				var parent = self.parent('.sort-item');
				if (self.hasClass('asc') && parent.hasClass('selected')) {
					var asc = self.data('search-asc');
					if (asc) {
						self.data('search-asc', 'false');
					} else {
						self.data('search-asc', 'true');
					}
				}

				self.parents('.items').find('.sort-item').removeClass(
						'selected');
				self.parent('.sort-item').addClass('selected');

				var params = collectParams([ collectSnParams,
						collectCityParams, collectPageParams,
						collectQueryParams, collectSortParams ]);

				var url = getPageUrl() + "?" + params;
				
				url = encodeURI(url);
				
				window.location.href = url;
				return false;
			});

	var moreTroggle = function(more) {
		var self = $(more);
		var area = self.parents('.sn-area');
		if (area.hasClass('sn-area-hide')) {
			more.html('更多<i class="fa fa-angle-down">');
		} else {
			more.html('收起<i class="fa fa-angle-up">');
		}
	}

	$('.sn-area .more').each(function(index, value) {
		var self = $(this);
		var area = self.parents('.sn-area');

		if (area.hasClass('sn-area-selected')) {
		} else {
			area.addClass('sn-area-hide');
		}

		moreTroggle(self);
	});

	$('.sn-area .more').on('click.more', function() {
		var self = $(this);
		var area = self.parents('.sn-area');
		if (area.hasClass('sn-area-hide')) {
			area.removeClass('sn-area-hide');
		} else {
			area.addClass('sn-area-hide');
		}
		moreTroggle(self);
	});

	 var selectedSubject = $('.sn-area .subject-class .subjects .item-list .selected');
	 if (!selectedSubject || selectedSubject.length == 0) {
	 	var classes = $('.sn-area .subject-class .subjects');
	 	$(classes[0]).addClass('subjects-selected');
	 }else{
		selectedSubject.each(function(index, value){
			var self = $(this);
			self.parents('.subjects').addClass('subjects-selected');
			//self.parents('.sn-area').removeClass('sn-area-hide');
		});
	}

	$('.sn-area .subject-class .subjects .class-name').on('click', function(){
		var self = $(this);
		self.parents('.subject-class').find('.subjects').removeClass('subjects-selected');
		self.parents('.subjects').addClass('subjects-selected');
		//self.parents('.sn-area').removeClass('sn-area-hide');
		//moreTroggle(self.parents('.sn-area').find('.more'));
	});
	
	$('.result-list .teacher .yue').on('click', function(event){
		event.preventDefault();
		var self = $(this);
		var login = $('[data-login]').data('login');
		if(login){
			var title = '<p>扫一扫二维码</p>'+
			'<p style="font-size: 24px; font-weight:bold; line-height:2;">下载家有学霸app，免费预约海量名校学霸！</p>'+
			'<p style="font-size: 24px; font-weight:bold; line-height:2;">还能领取百元课时红包哦~</p>';
			swal({
				title: title,
				confirmButtonColor: '#24a6b5',
				confirmButtonText: '确定',
				imageUrl: 'http://7xlkzr.com2.z0.glb.qiniucdn.com/1448246427.png',
				imageSize: '200x200',
				html: true
			})
		}else{
			var url = $('#signInUrl').val();
			window.location.href = url;
		}
		return false;
	});
	$('.result-list .teacher').on('click', function(){
		var url = $('#teacherDetailUrl').val();
		var self = $(this);
		url += self.data('id');
		//window.location.href = url;
		window.open(url);
	});

})(jQuery);