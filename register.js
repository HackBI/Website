//check to see if nav bar's background should be added/removed
//check to see if page's background color should be changed
function updateBgs() {
	var bottom_of_nav = $(window).scrollTop() + $('.nav').height();
	var threshold = $(window).height() / 6;

	if (bottom_of_nav > threshold && ($(window).width() >= 992)) {
		$('.nav').css({'background-color': '#f4f4f4', 'height': '50px', 'top': '-7px'});
		$('.nav li a').css({'color': 'black'});
	} else if (bottom_of_nav < threshold) {
		$('.nav').css({'background-color': 'transparent', 'height': '60px', 'top': '5px'});
		$('.nav li a').css({'color': 'white'});
	}
}

$(document).ready(function() {
    updateBgs();

    $(window).scroll(function() {
		updateBgs();
	});
});