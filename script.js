function contactSubmit() {
  var name = escape($("#namef1").val()); //.replace(/\s/g, "+"));
  var email = escape($("#emailf1").val()); //.replace(/\s/g, "+"));
  var question = escape($("#contactq1").val()); //.replace(/\s/g, "+"));

  if (question == "" || name == "" || email == "") {
    alert("Please enter a value for all fields");
  } else {
    emailjs.init("user_mWOtaoxzxeJyW8OxdfwGS");
    let contactParams = {
      from_name: name,
      from_email: email,
      message: question,
    };
    emailjs
      .send("service_9403v3m", "template_v3e8pel", contactParams)
      .then(function (res) {});
    /*
		$.ajax({
			headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
    			},
			'type': 'POST',
			'url': `https://script.google.com/macros/s/12ypMJ7zWRlplNKYfiUfbH4Vyfv1RgB8tVNxP2BFBffXww3A5skAgSNVG/exec?function=contact&name=${name}&email=${email}&questions=${question}`,
			crossDomain: true,
			contentType: false,
			dataType: 'text/javascript',
			processData: false,
			beforeSend: function() {
				$('#contactsubmit').prop('disabled','true');
				$('#contactsubmit').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 7px"></span>&ensp;Working..');
			},
			statusCode: {
				200: function() {
					$('#contactsubmit').text('Success!');
					setTimeout(function() {
						$('#contactsubmit').removeAttr("disabled");
						$('#contactsubmit').text('Submit');
					}, 1500);
				}
			}
		});
			*/
    console.log("sent message");
  }
  return;
}

function preregisterSubmit() {
  $("#volbtnsubmit").prop("disabled", "true");
  var name = escape($("#namef").val().replace(/\s/g, "+"));
  var email = escape($("#emailf").val().replace(/\s/g, "+"));

  $.ajax({
    type: "POST",
    url: `https://script.google.com/macros/s/AKfycbxK5zr2m51a5ARZdjipIFJ4P3XKkyjM-Yi64VhcalGLLraeetc/exec?function=preregister&name=${name}&email=${email}`,
    crossDomain: true,
    contentType: false,
    dataType: "text/javascript",
    processData: false,
    beforeSend: function () {
      $("#volbtnsubmit").prop("disabled", "true");
      $("#volbtnsubmit").html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 7px"></span>&ensp;Working..'
      );
    },
    statusCode: {
      200: function () {
        $("#volbtnsubmit").text("Success!");
        setTimeout(function () {
          $("#preregisterModal").modal("hide");
        }, 1500);
      },
    },
  });
}

function clearForm() {
  document.getElementById("contactform").reset();
  if (registerReq != 0) {
    $("#contactq").prop("readonly", false);
    $("#contactq").prop("placeholder", "Question");
    document.getElementById("emailf").classList.remove("contacthl");
    document.getElementById("namef").classList.remove("contacthl");
    document.getElementById("contactq").classList.remove("contactc");
    registerReq = 0;
  }
  return;
}

$(document).ready(function () {
  if (window.innerWidth > 767) {
    // Load video if on desktop
    $("video").append('<source src="HackBIShort.mp4" type="video/mp4">');
    $("video").css("opacity", ".89");
    $("video").get(0).load();
  } else {
    // Else keep poster image
    $("video").css("opacity", ".95");
  }
});
