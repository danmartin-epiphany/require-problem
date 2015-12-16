define([
	"jquery"
], function(
	$
) {
	$(function() {

		fixedHeight = function(){
			if($('.fixed').length > 0){
				var fixedH = 0;
				$('.fixed').each(function(){
					fixedH = $(this).height() + fixedH;
				});
				$('body').css('padding-top', fixedH);
				$('.row.content').css('opacity', '1');
			}
		};

	});
});