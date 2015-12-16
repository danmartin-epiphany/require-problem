define([
	"jquery",
	"bootstrap",
	"app/fixed-height",
	"app/alert",
	"fuse",
	"bootbox",
	"bootstrap.wysihtml5.en-US",
	"app/user-switcher"
], function(
	$,
	boot,
	fixedheight,
	alert,
	fuse,
	bootbox,
	wysihtml5,
	userswitcher
) {
	$(function() {

		var main = {
			init: function(){
				new fixedHeight();
				new userSwitcher();

				$('.back-to-top').on('click', function(e){
					e.preventDefault();
					$('html, body').animate({scrollTop:0}, '500');
				});

				 $('.rtf-textarea').wysihtml5({ locale: 'en-US', "image" : false, "link" : false });
			}
		};
		main.init();

	});
});