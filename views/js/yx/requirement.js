(function($){
	$('.requirement-form .mod-acode .change-acode').on('click.change-acode', function(event){
        event.preventDefault();
        function chgUrl(url) {
            var timestamp = (new Date()).valueOf();
            url = url + "?timestamp=" + timestamp;
            return url;
        }
        var self = $(this);
        var image = self.parent('.requirement-form .mod-acode').find('.acode-img');
        var src = self.data('src');
        image.attr("src", chgUrl(src))
    });

    $('.requirement-form .select-time .time-items .time').on('click', function(){
    	var self = $(this);
    	if(self.hasClass('selected')){
    		self.removeClass('selected');
    	}else{
    		self.addClass('selected');
    	}
    });
})(jQuery);