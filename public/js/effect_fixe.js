var resizeElementFixed = function() {
	$('.fixed').each(function(index, value) {
		var rect = value.getBoundingClientRect();
		var width = $(value).parent().css('width');
		var padding = $(value).parent().css('padding');
		width = parseFloat(width.substring(0, width.length - 2));
		padding = parseFloat(padding.substring(0, padding.length - 2));
		if ($(window).height() >= rect.top + $(value).outerHeight()) {
			$(value).css({'position' : 'fixed', 'max-width': (width - (padding * 2))});
			return ;
		}
		$(value).css({'position' : 'relative', 'max-width': (width - (padding * 2))});
	});
}

$(document).ready(function() {
	resizeElementFixed();
});

$(window).resize(function() {
	resizeElementFixed();
});
