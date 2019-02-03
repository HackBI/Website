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

	/* $('#wave1').wavify({
		height: 230,
		bones: 4,
		amplitude: -30,
		color: 'rgba(255, 255, 255, 1)',
		speed: .15
	  });
	$(".wave-container").css({'opacity': '0'}).animate({'opacity': '.99'}, 5000); */

	$('a[href^="#eventbrite"]').on('click',function (e) {
	    e.preventDefault();

		$('#evb').animate({'margin-bottom': '500px'}, 900, 'swing');
		//$('.eventbrite_embed iframe').animate({'opacity': 1}, 500, 'swing');

		var script = document.createElement('script');
   		script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
   		var head = document.getElementsByTagName("head")[0];
   		head.appendChild(script);

		var exampleCallback = function () {
			console.log('Order complete!');
		};

		window.EBWidgets.createWidget({
			// Required
			widgetType: 'checkout',
			eventId: '55495250789',
			iframeContainerId: 'eventbrite-widget-container-55495250789',

			// Optional
			iframeContainerHeight: 425, // Widget height in pixels. Defaults to a minimum of 425px if not provided
			onOrderComplete: exampleCallback // Method called when an order has successfully completed
		});
	});
});