//reveal .hideme elements when they enter the window
function updateHideShow() {
	$('.hideme').each(function (i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if (bottom_of_window > bottom_of_object) {
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
		$('.nav').css({
			'background-color': '#f4f4f4',
			'height': '50px',
			'top': '-7px'
		});
		$('.nav li a').css({
			'color': 'black'
		});
	} else if (bottom_of_nav < threshold) {
		$('.nav').css({
			'background-color': 'transparent',
			'height': '60px',
			'top': '5px'
		});
		$('.nav li a').css({
			'color': 'white'
		});
	}
}

//set the jumbotron height to fill the screen
//vertically center logo text if user is on dekstop
function setJumbotronHeight() {
	$scrHeight = $(window).innerHeight();
	$scrWidth = $(window).innerWidth();

	$outerScrHeight = $(window).outerHeight();
	$outerScrWidth = $(window).outerWidth();

	$mainHeight = $("#main-text").height() / 1.5;
	$mainWidth = $("#main-text").width() / 2;

	$buttonHeight = $("#button-container").height() / 2;
	$buttonWidth = $("#button-container").width() / 2;

	$("#button-container").css({
		'left': (($outerScrWidth / 2 - $buttonWidth) + "px"),
		'top': (($outerScrHeight / 2 - $buttonHeight) + "px")
	});
	$("#main-text").css({
		'left': (($outerScrWidth / 2 - $mainWidth) + "px"),
		'top': (($outerScrHeight / 2 - $mainHeight) + "px")
	});
}

var registerReq = 0

function requestNotif() {
	registerReq=1;
	$('#contactq').attr('placeholder', 'Request to be notified when registration opens.');
	$('#contactq').val('');
	$('#contactq').prop('readonly', 'true');
	$('a[href^="#contactScroll"]').trigger("click");
	setTimeout(function() {
		document.getElementById("emailf").classList.add('contacthl');
		document.getElementById("namef").classList.add('contacthl');
		document.getElementById("contactq").classList.add('contactc');
	}, 1500);
}

function contactSubmit() {
	var name = escape($('#namef').val().replace(/\s/g, "+"));
	var email = escape($('#emailf').val().replace(/\s/g, "+"));
	var question = escape($('#contactq').val().replace(/\s/g, "+"));

	if ((registerReq == 0 && question == "") || name == "" || email == "") {
		alert("Please enter a value for all fields");
	}
	else {
		if (registerReq == 1) {
			registerReq = 0;
			$.ajax({
				'async': false,
				'type': 'POST',
				'url': 'https://script.google.com/macros/s/AKfycbyWmBdqNOtAiWIsw2iRL7Vl00TxHjHNmx5ZLKKyO4m8K7h2nc4/exec?function=requestRegistrationNotification&name=' + name + '&email=' + email
			});
			$('#emailf, #namef').css({'box-shadow': 'none'});
			$('#contactq').prop('readonly', false);
			$('#contactq').prop('placeholder', 'Question');
		}
		else {
			$.ajax({
				'async': false,
				'type': 'POST',
				'url': 'https://script.google.com/macros/s/AKfycbyWmBdqNOtAiWIsw2iRL7Vl00TxHjHNmx5ZLKKyO4m8K7h2nc4/exec?function=contact&name=' + name + '&email=' + email + '&question=' + question
			});
		}

		$('#contactsubmit').text('Sent');
		$('#contactsubmit').attr("disabled", true);
		document.getElementById("contactform").reset();
		setTimeout(function() { $('#contactsubmit').removeAttr("disabled"); $('#contactsubmit').text('Submit'); }, 1500);

	}
	return;

}

function notifSubmit() {
	$('#btnsubmit').text('Working..');
	var name = escape($('#namei').val().replace(/\s/g, "+"));
	var email = escape($('#emaili').val().replace(/\s/g, "+"));

	$.ajax({
		'type': 'POST',
		'url': 'https://script.google.com/macros/s/AKfycbxedUj20c_jqyXlqyHYnBghGP3QIMvoSaAcJHv5A-Q_jgWoGkCq/exec?name=' + name + '&email=' + email,
		crossDomain: true,
		contentType: false,
		dataType: 'text/javascript',
		processData: false,
		beforeSend: function() {
			$('#btnsubmit').text('Working..');
		},
		statusCode: {
			200: function() {
				$('#btnsubmit').text('Thank you!');
				setTimeout(function() {
					$('#roboticsModal').modal('toggle');
				}, 1000);
			}
		}
	});
}

function clearForm() {
	document.getElementById("contactform").reset();
	if (registerReq != 0) {
		$('#contactq').prop('readonly', false);
		$('#contactq').prop('placeholder', 'Question');
		document.getElementById("emailf").classList.remove('contacthl');
		document.getElementById("namef").classList.remove('contacthl');
		document.getElementById("contactq").classList.remove('contactc');
		registerReq = 0;
	}
	return;
}

$(document).ready(function () {
	$('#font').removeAttr("media");
	$(".vid-container").css({'height': (window.innerHeight + 4) + "px"});
	setJumbotronHeight();

	if ($scrWidth > 767) {
		$("#video").css({
			'min-width': '100%',
			'min-height': '100%'
		})
		$(".vid-container").css({
			'opacity': '0'
		}).animate({
			'opacity': '.99'
		}, 1500);

	} else {
		$(".vid-container").css({
			'margin-bottom': '40px'
		});

		$('#wave1').wavify({
			height: 200,
			bones: 4,
			amplitude: 90,
			color: 'rgba(255,140,90,.3)',
			speed: .15
		});

		$(".wave-container").css({
			'opacity': '0'
		}).animate({
			'opacity': '.99'
		}, 7000);

	}

	if (navigator.userAgent.indexOf("Firefox") != -1) {
		$('#rb').css({'margin-top': '200px'});
		$('#rb').css({'margin-left': '100px'});
	}

	updateHideShow();
	updateBgs();
	$('canvas').css({
		'width': $(window).width(),
		'height': $(window).height() * 1.5
	});

	$(window).scroll(function () {
		updateHideShow();
		updateBgs();
	});

	$(window).resize(function () {
		$('canvas').css({
			'width': $(window).width(),
			'height': $(window).height() * 1.5
		});
	});



	//smooth scrolling for anchor links
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({'scrollTop': $target.offset().top - ($target.height()/3)}, 900, 'swing', function() {
			if (window.scrollY != Math.floor($target.offset().top - ($target.height()/3))) {
				$('html, body').stop().animate({'scrollTop': $target.offset().top - ($target.height()/3)}, 500, 'swing');
			}
		});
	});
});
