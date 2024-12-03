let generatedOtp;

// Generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
}

// Send OTP via Email (using SMTP.js)
document.getElementById('sendOtpBtn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!email || !phone) {
        alert('Please enter both email and phone number');
        return;
    }

    generatedOtp = generateOtp(); // Generate OTP

    // Using SMTP.js to send email
    Email.send({
        SecureToken: "abf32f9c-8626-4758-8395-a2187f5719d5", // Replace with your SMTP secure token
        To: email,
        From: "hardhikreddy1@gmail.com", // Replace with your verified sender email
        Subject: "Your OTP Code",
        Body: `Your OTP for verification is ${generatedOtp}.`
    }).then((message) => {
        if (message === "OK") {
            document.getElementById('otpForm').classList.add('d-none');
            document.getElementById('verifyForm').classList.remove('d-none');
            document.getElementById('statusMessage').innerText = "OTP sent successfully!";
        } else {
            alert("Failed to send OTP. Please check your SMTP credentials.");
        }
    });
});

// Verify OTP
document.getElementById('verifyOtpBtn').addEventListener('click', function () {
    const enteredOtp = document.getElementById('otp').value;

    if (parseInt(enteredOtp) === generatedOtp) {
        document.getElementById('statusMessage').innerText = "OTP Verified Successfully!";
        document.getElementById('statusMessage').classList.add('text-success');
    } else {
        document.getElementById('statusMessage').innerText = "Invalid OTP. Please try again.";
        document.getElementById('statusMessage').classList.add('text-danger');
    }
});
