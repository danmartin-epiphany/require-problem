define([
	"jquery"
], function(
	$
) {
	$(function() {

		$('.generic-alert').find('.glyphicon-plus').on('click', function(e){
			var alertBox = $(this).parent();
			new closeAlert(alertBox);
		});

		closeAlert = function(alert){
			alert.addClass('out');
		};

	});
});