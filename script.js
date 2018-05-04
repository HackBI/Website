
//reveal .hideme elements when they enter the window
function updateHideShow() {
	$('.hideme').each( function(i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if ( bottom_of_window > bottom_of_object ) {
			$(this).addClass('showme');
		}
	});
}

//check to see if nav bar's background should be added/removed
//check to see if page's background color should be changed
function updateBgs() {
	var bottom_of_nav = $(window).scrollTop() + $('.nav').height();
	var threshold = $(window).height() / 6;

	if (bottom_of_nav > threshold && ($(window).width() >= 992)) {
		$('.nav').css({'background-color': '#f4f4f4', 'height': '45px', 'top': '-7px'});
		$('.nav li a').css({'color': 'black'});
	} else if (bottom_of_nav < threshold) {
		$('.nav').css({'background-color': 'transparent', 'height': '60px', 'top': '5px'});
		$('.nav li a').css({'color': 'white'});
	}
}

//set the jumbotron height to fill the screen
//vertically center logo text if user is on dekstop
function setJumbotronHeight() {
	$scrHeight = $(window).outerHeight();
	$scrWidth = $(window).outerWidth();
	
	$txtHeight = $("#main-text").height() / 1.95;
	$txtWidth = $("#main-text").width() / 1.925;

	$("#main-text").css({'left': (($scrWidth / 2 - $txtWidth) + "px"), 'top': (($scrHeight / 2 - $txtHeight) + "px")});
}

$(document).ready(function() {
	$('#font').removeAttr("media");
	$(".vid-container").css({'height': window.innerHeight+2 + "px"});
	setJumbotronHeight();

	if ($scrWidth > 767) {
		$("#video").css({'min-width': '100%', 'min-height': '100%'})
		$(".vid-container").css({'opacity': '0'}).animate({'opacity': '.99'}, 1500);
	}
	else {
		var video = document.getElementById('video');
		video.remove();
		$(".vid-container").css({'margin-bottom': '40px'});
		$('#wave1').wavify({
			height: 200,
			bones: 4,
			amplitude: 90,
			color: 'rgba(255,140,90,.3)',
			speed: .15
		  });
		$(".wave-container").css({'opacity': '0'}).animate({'opacity': '.99'}, 7000);
	}

	updateHideShow();
	updateBgs();
	$('canvas').css({'width': $(window).width(), 'height': $(window).height() * 1.5});

	$(window).scroll(function() {
		updateHideShow();
		updateBgs();
	});

	$(window).resize(function () {
		// Resize vid-container
		if ($(window).outerWidth() <= 767) {
			$(".vid-container").css({'margin-bottom': '40px'});
		}
		else {
			$(".vid-container").css({'margin-bottom': '0px'});
		}
		$('canvas').css({'width': $(window).width(), 'height': $(window).height() * 1.5});
	});

	//smooth scrolling for anchor links
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

			$('html, body').stop().animate({'scrollTop': $target.offset().top - $target.height() + 40}, 900, 'swing');
	});
});
