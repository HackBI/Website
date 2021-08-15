//check to see if nav bar's background should be added/removed
//check to see if page's background color should be changed
function updateBgs() {
  var bottom_of_nav = $(window).scrollTop() + $(".nav").height();
  var threshold = $(window).height() / 6;

  if (bottom_of_nav > threshold && $(window).width() >= 992) {
    $(".nav").css({
      "background-color": "#f4f4f4",
      height: "50px",
      top: "-7px",
    });
    $(".nav li a").css({ color: "black" });
  } else if (bottom_of_nav < threshold) {
    $(".nav").css({
      "background-color": "transparent",
      height: "60px",
      top: "5px",
    });
    $(".nav li a").css({ color: "white" });
  }
}

$(document).ready(function () {
  updateBgs();

  $(window).scroll(function () {
    updateBgs();
  });

  pattern = new RegExp("[a-zA-Z]{2,}_[a-zA-Z]{2,}.+");

  $("#file-1").change(function () {
    try {
      for (var i = 0; i < this.files.length; i++) {
        if (!pattern.test(this.files[i].name)) {
          alert(
            'File "' +
              this.files[i].name +
              '" is not named properly.\n\nPlease name your files: "First Name_Last Name" and please do not abbreviate. Extensions and numbers at the end are okay.'
          );
          continue;
        }
        $(".content").append(
          $("template")
            .html()
            .replace(
              '<div class="name"></div>',
              '<div class="name" data-file-size="' +
                this.files[i].size +
                '">' +
                this.files[i].name +
                "</div>"
            )
        );
        uploaded_files.push(this.files[i]);
      }
    } catch {
      alert("Something didn't work quite right. Try again.");
      location.reload();
    }
  });

  $("#timesbtn").click(function () {
    $("#timesalert").toggle();
  });

  uploaded_files = [];
  ajaxresponses = 0;
  ajax_response = null;
});

function dropHandler(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        if (!pattern.test(file.name)) {
          alert(
            'File "' +
              file.name +
              '" is not named properly.\n\nPlease name your files: "First Name_Last Name" and please do not abbreviate. Extensions and numbers at the end are okay.'
          );
          continue;
        }
        $(".content").append(
          $("#filename")
            .html()
            .replace(
              '<div class="name"></div>',
              '<div class="name" data-file-size="' +
                file.size +
                '">' +
                file.name +
                "</div>"
            )
        );
        uploaded_files.push(file);
      }
    }
  } else {
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      if (!pattern.test(ev.dataTransfer.files[i].name)) {
        alert(
          'File "' +
            ev.dataTransfer.files[i].name +
            '" is not named properly.\n\nPlease name your files: "First Name_Last Name" and please do not abbreviate. Extensions and numbers at the end are okay.'
        );
        continue;
      }
      $(".content").append(
        $("template")
          .html()
          .replace(
            '<div class="name"></div>',
            '<div class="name" data-file-size="' +
              ev.dataTransfer.files[i].size +
              '">' +
              ev.dataTransfer.files[i].name +
              "</div>"
          )
      );
      uploaded_files.push(ev.dataTransfer.files[i]);
    }
  }
}

function dragOverHandler(ev) {
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

      fr.onloadend = function (e) {
        data = e.target.result.replace(/^.*,/, "");
        mimetype = e.target.result.match(/^.*(?=;)/)[0];
        filename = e.target.fileName;

        var fd = new FormData();
        fd.append("data", data);
        fd.append("mimetype", mimetype);
        fd.append("filename", filename);

        ajax_response = $.ajax({
          type: "POST",
          url: "https://script.google.com/macros/s/AKfycbzDg5C5xQnFNwwlqQoinEZNJPGMBDhNDq6V96uC2z6Doby088Q/exec",
          data: fd,
          crossDomain: true,
          contentType: false,
          dataType: "text/javascript",
          processData: false,
          beforeSend: function () {
            $("#submitbtn").text("Uploading..");
          },
          statusCode: {
            200: function () {
              ajaxresponses++;
              if (ajaxresponses == uploaded_files.length) {
                $("#submitbtn").text("Submitted");
                $(".file").remove();
                uploaded_files.length = 0;
                ajaxresponses = 0;
                setTimeout(function () {
                  $("#registrationModal").modal("toggle");
                }, 1000);
                setTimeout(function () {
                  location.reload();
                }, 5000);
              }
            },
          },
        });
      };
      fr.readAsDataURL(file); // https://script.google.com/macros/s/AKfycbzDg5C5xQnFNwwlqQoinEZNJPGMBDhNDq6V96uC2z6Doby088Q/exec
    }
  } catch (e) {
    alert("Something didn't work quite right. Try again.");
    console.log(e);
  }
}

function notifSubmit() {
  $("#volbtnsubmit").text("Working..");
  var name = escape($("#namef").val().replace(/\s/g, "+"));
  var email = escape($("#emailf").val().replace(/\s/g, "+"));

  $.ajax({
    type: "POST",
    url:
      "https://script.google.com/macros/s/AKfycbwvNmiF7oFouuSkzQuxV-A3wPcYkduRHXmJjLG0jUJrsOjTE7S7/exec?name=" +
      name +
      "&email=" +
      email,
    crossDomain: true,
    contentType: false,
    dataType: "text/javascript",
    processData: false,
    beforeSend: function () {
      $("#volbtnsubmit").text("Working..");
    },
    statusCode: {
      200: function () {
        $("#volbtnsubmit").text("Thank you!");
        setTimeout(function () {
          $("#volunteerModal").modal("toggle");
        }, 1000);
        setTimeout(function () {
          location.reload();
        }, 5000);
      },
    },
  });
}
