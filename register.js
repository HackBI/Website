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

	$("#file-1").change(function(){
		console.log('File(s) inserted.');
		try {
			for (var i=0; i < this.files.length; i++) {
				$('.content').append($('template').html().replace('<div class="name"></div>','<div class="name">' + this.files[i].name + '</div>'));
				uploaded_files.push(this.files[i]);
			}
		} catch {
			alert("Something didn't work quite right. Try again.");
			location.reload();
		}
	});

	uploaded_files = [];
	ajaxresponses = 0;
	
	var clicked = 0;

	$('a[href^="#eventbrite"]').on('click',function (e) {
		
	    if (clicked != 0) {
			return;
	    }
	    clicked++;
		
	    e.preventDefault();

		$('#evb').animate({'margin-bottom': '15px'}, 900, 'swing');
		//$('.eventbrite_embed iframe').animate({'opacity': 1}, 500, 'swing');

		function next() {
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
		}

		var script = document.createElement('script');
		script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
		document.getElementsByTagName("head")[0].appendChild(script);
		   
		if(script.readyState) {  // only required for IE <9
			script.onreadystatechange = function() {
			  if ( script.readyState === "loaded" || script.readyState === "complete" ) {
				script.onreadystatechange = null;
				next();
			  }
			};
		  } else {  //Others
			script.onload = function() {
			  next();
			};
		  }

	});
});

function dropHandler(ev) {
	console.log('File(s) dropped');
	ev.preventDefault();
  
	if (ev.dataTransfer.items) {
	  // Use DataTransferItemList interface to access the file(s)
	  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
		// If dropped items aren't files, reject them
		if (ev.dataTransfer.items[i].kind === 'file') {
		  var file = ev.dataTransfer.items[i].getAsFile();
		  console.log('... file[' + i + '].name = ' + file.name);
		  $('.content').append($('#filename').html().replace('<div class="name"></div>','<div class="name">' + file.name + '</div>'));
		  uploaded_files.push(file);
		}
	  }
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
			$('.content').append($('template').html().replace('<div class="name"></div>','<div class="name">' + ev.dataTransfer.files[i].name + '</div>'));
			uploaded_files.push(ev.dataTransfer.files[i]);
		}
	}
}
  
function dragOverHandler(ev) {
	console.log('File(s) in drop zone'); 
	ev.preventDefault();
}
  
function doPost() { 
	try {
		for (var i = 0; i < uploaded_files.length; i++) {
			var file = uploaded_files[i];
			var fr = new FileReader();
			fr.fileName = file.name;
		
			var data;
			var mimetype;
			var filename;
	  
			fr.onloadend = function(e) {
				data = e.target.result.replace(/^.*,/, '');
				mimetype = e.target.result.match(/^.*(?=;)/)[0];
				filename = e.target.fileName;
	
				var fd = new FormData();
				fd.append('data', data);
				fd.append('mimetype', mimetype);
				fd.append('filename', filename);
			
				$.ajax({
					type: 'POST',
					url: 'https://script.google.com/macros/s/AKfycbzDg5C5xQnFNwwlqQoinEZNJPGMBDhNDq6V96uC2z6Doby088Q/exec',
					data: fd,
					crossDomain: true,
					contentType: false,
					processData: false,
					success: updateStatus
				});
			}
			fr.readAsDataURL(file);
		}
	} catch {
		alert("Something didn't work quite right. Try again.");
	}
}
  
function updateStatus() {
	ajaxresponses++;
	if (ajaxresponses == uploaded_files.length) {
	  $('#submitbtn').text('Submitted.');
	  $('.file').remove();
	  uploaded_files.length = 0;
	}
}