<?php
// --- CONFIGURATION ---
$admin_email = "paulikonyamwaura@gmail.com"; 
$company_name = "Mars Sign & Craft";
$company_address = "Shop No-A274-275, Mezzanine Floor, Dragon Mart, Doha, Qatar";
$noreply_email = "noreply@marssign.com"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize inputs
    $name = strip_tags(trim($_POST["name"]));
    $company = strip_tags(trim($_POST["company"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $service = strip_tags(trim($_POST["service"]));
    $details = trim($_POST["details"]);

    if (empty($name) || empty($phone) || empty($service) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit("Invalid Input");
    }

    // --- 1. EMAIL TO ADMIN (You) ---
    $subject_admin = "New Project Inquiry: $name";
    $message_admin = "
    <html><body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2 style='color: #000;'>New Lead Received</h2>
        <p><strong>Name:</strong> $name<br>
           <strong>Company:</strong> " . ($company ?: "N/A") . "<br>
           <strong>Email:</strong> $email<br>
           <strong>Phone:</strong> $phone<br>
           <strong>Service:</strong> $service</p>
        <p><strong>Specifications:</strong><br>" . nl2br($details) . "</p>
    </body></html>";

    $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $company_name <$noreply_email>\r\n";
    $headers .= "Bcc: noreply@marssign.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // --- 2. EMAIL TO CUSTOMER (Auto-responder) ---
    $subject_user = "We have received your request - $company_name";
    $message_user = "
    <html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #000;'>Hello $name,</h2>
        <p>Thank you for reaching out to <strong>$company_name</strong>. We have successfully received your inquiry regarding <strong>$service</strong>.</p>
        <div style='background: #f4f4f4; padding: 15px; border-radius: 5px;'>
            <strong>Our Customer Assurance:</strong><br>
            Our team is currently reviewing your project specifications. We strive to respond to all inquiries within 24 hours. We pride ourselves on quality fabrication and clear communication, and we look forward to working with you.
        </div>
        <p>Best Regards,<br>The Team at $company_name<br>$company_address</p>
    </body></html>";

    $headers_user = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n";
    $headers_user .= "From: $company_name <$noreply_email>\r\n";

    // Envelope sender for both
    $envelope = "-f$noreply_email";

    // Send both emails
    $admin_sent = mail($admin_email, $subject_admin, $message_admin, $headers, $envelope);
    $user_sent = mail($email, $subject_user, $message_user, $headers_user, $envelope);

    if ($admin_sent) {
        http_response_code(200);
        echo "Success";
    } else {
        http_response_code(500);
        echo "Server Mail Error";
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
?>