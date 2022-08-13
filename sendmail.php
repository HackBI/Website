<?php

    # variables from the form
    $name = $_POST['name']; 
    $email = $_POST['email'];
    $message = $_POST['message'];

    # email variables
    $email_to = "hackbi@bishopireton.org"; # this can be changed to send the email to whatever email you want
    $email_subject = "New Message From HackBi.org";
    $email_body = "$name has sent a messsage using the hackbi.org contact form:
        \r\n$message
        \r\nYou can reach them at the email: $email";

    # sending the email
    mail($email_to, $email_subject, $email_body);

    # clearing the form by refreshing the page
    header("Location: https://hackbi.org/#contact");
?>    