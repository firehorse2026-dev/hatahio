<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // The email address that will receive the notifications
    $recipient_email = "chegesammwel@gmail.com"; 
    
    // Sanitize and validate inputs from your specific HTML form
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    
    $company = strip_tags(trim($_POST["company"])); // Optional field
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $service = strip_tags(trim($_POST["service"]));
    $details = trim($_POST["details"]);

    // Check that required data was sent
    if ( empty($name) OR empty($phone) OR empty($service) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete all required fields and try again.";
        exit;
    }

    // Set the email subject
    $subject = "New Project Inquiry: $name - $service";

    // Build the email content
    $email_content = "New Lead from Mars Sign Website\n";
    $email_content .= "===============================\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Company: " . ($company ? $company : "Not provided") . "\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Service Required: $service\n\n";
    $email_content .= "Project Specifications:\n$details\n";

    // Build the email headers
    $email_headers = "From: Mars Signs Website <noreply@marssign.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Send the email
    if (mail($recipient_email, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Success";
    } else {
        http_response_code(500);
        echo "Server Mail Error";
    }

} else {
    // Not a POST request
    http_response_code(403);
    echo "Forbidden";
}
?>