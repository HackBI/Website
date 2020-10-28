// Reveal .hideme elements when in view
function updateHideShow() {
	$('.hideme').each(function(i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if (bottom_of_window > bottom_of_object) {
			$(this).addClass('showme');
		}
	});
}

// Toggle transparent/opaque navbar
function updateNav() {
	var bottom_of_nav = $(window).scrollTop() + $('.navbar').height();
	var threshold = $('.jumbotron').height() / 4;

	if (bottom_of_nav > threshold) {
		$('.cta').removeClass('btn-light');
		$('.cta').addClass('btn-dark');
		$('.navbar').removeClass('bg-transparent');
		$('.navbar').addClass('bg-light');
		$('.navbar').addClass('navbar-light');
		$('.navbar').removeClass('navbar-dark');
		$('svg #Text').css('fill', '#41464d');
		$('body').css('--nav-hamburger-color', '#41464d');
	} else {
		$('.cta').removeClass('btn-dark');
		$('.cta').addClass('btn-light');
		$('.navbar').removeClass('bg-light');
		$('.navbar').addClass('bg-transparent');
		$('.navbar').removeClass('navbar-light');
		$('.navbar').addClass('navbar-dark');
		$('svg #Text').css('fill', 'white');
		$('body').css('--nav-hamburger-color','white');
	}
}

$(document).ready(function() {
	updateNav();
	updateHideShow();

	$(window).scroll(function() {
		updateHideShow();
		updateNav();
	});

    $('.navbar-toggler').on('click', function() {
		$('.cta').removeClass('btn-light');
		$('.cta').addClass('btn-dark');
        $('.navbar').removeClass('bg-transparent');
		$('.navbar').addClass('bg-light');
		$('.navbar').addClass('navbar-light');
		$('.navbar').removeClass('navbar-dark');
		$('svg #Text').css('fill', '#41464d');
        $('body').css('--nav-hamburger-color','#41464d');
        $(this).toggleClass('is-active');
    });

    // Smooth scrolling for URLs
    if (window.location.hash) {
		var target = window.location.hash;
		var $target = $(target);
		var nav = 54;
		$('html, body').stop().animate({'scrollTop': $target.offset().top - nav - 35}, 900, 'swing');
	}

	// Smooth scrolling for anchor links
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		$('#navbarNav').collapse('hide');
		$('.navbar-toggler').removeClass('is-active');
		var target = this.hash;
		var $target = $(target);
		var nav = 54;
		$('html, body').stop().animate({'scrollTop': $target.offset().top - nav - 35}, 900, 'swing');
	});
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    const re = /^[a-zA-Z-]{2,}(\s[a-zA-Z-]{2,})+$/;
    return re.test(String(name).toLowerCase());
}

function validateField(item) {
	try {
		var field = item.field;
		var text = item.field.val();
		var type = item.type;
		var validated = false;
		if (type == "name") {
			if (!validateName(text)) {
				field.removeClass('is-valid');
				field.addClass('is-invalid');
				field.unbind();
				field.on("input", () => validateField({field: field, type: "name"}));
			}
			else {
				field.removeClass('is-invalid');
				field.addClass('is-valid');
				return true;
			}
		}
		else if (type == "email") {
			if (!validateEmail(text)) {
				field.removeClass('is-valid');
				field.addClass('is-invalid');
				field.unbind();
				field.on("input", () => validateField({field: field, type: "email"}));
			}
			else {
				field.removeClass('is-invalid');
				field.addClass('is-valid');
				return true;
			}
		}
		else {
			return false;
		}
	} catch {
		return false;
	}
}