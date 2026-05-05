// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = [
                'first_name', 'last_name', 'nationality', 'passport_no', 'contact_no',
                'visa_type', 'visa_duration', 'marital_status', 'education',
                'email', 'cnic', 'passport_expiry', 'passport_issue'
            ];

            const paymentMethod = document.getElementById('paymentMethod').value;
            const customerAcc = document.getElementById('customerAcc').value;
            const senderName = document.getElementById('senderName').value;

            const missing = requiredFields.filter(field => !data[field]);
            if (missing.length > 0) {
                alert('براہ کرم تمام لازمی فیلڈز بھریں!');
                return;
            }

            if (!paymentMethod) {
                alert('براہ کرم ادائیگی کا طریقہ منتخب کریں!');
                return;
            }

            if (!customerAcc) {
                alert('براہ کرم اپنا اکاؤنٹ نمبر درج کریں!');
                return;
            }

            if (!senderName) {
                alert('براہ کرم اکاؤنٹ ہولڈر کا نام درج کریں!');
                return;
            }
            
            // Construct WhatsApp message
            let message = `*New Visa Application*\n\n`;
            message += `*Personal Information:*\n`;
            message += `First Name: ${data.first_name}\n`;
            message += `Last Name: ${data.last_name}\n`;
            message += `Nationality: ${data.nationality}\n`;
            message += `Passport No: ${data.passport_no}\n`;
            message += `Contact No: ${data.contact_no}\n`;
            message += `Visa Type: ${data.visa_type}\n`;
            message += `Visa Duration: ${data.visa_duration}\n`;
            message += `Marital Status: ${data.marital_status}\n`;
            message += `Education: ${data.education}\n`;
            message += `Email: ${data.email}\n`;
            message += `CNIC: ${data.cnic}\n`;
            message += `Passport Expiry: ${data.passport_expiry}\n`;
            message += `Passport Issue: ${data.passport_issue}\n\n`;

            message += `*Payment Information:*\n`;
            message += `Payment Method: ${paymentMethod}\n`;
            message += `Customer Account: ${customerAcc}\n`;
            message += `Account Holder: ${senderName}\n\n`;

            message += `*Application submitted on: ${new Date().toLocaleString()}*`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/923338181082?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Show success message
            bookingForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form after 10 seconds
            setTimeout(() => {
                bookingForm.reset();
                document.getElementById('paymentMethod').value = '';
                document.getElementById('customerAcc').value = '';
                document.getElementById('senderName').value = '';
                bookingForm.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }, 10000);
        });
    }

    // Set minimum date to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

function toggleHeroPanel() {
    const panel = document.getElementById('heroPanel');
    const button = document.querySelector('.hero-lines');
    if (panel) {
        panel.classList.toggle('active');
    }
    if (button) {
        button.classList.toggle('active');
    }
}

function showPhonePopup(event) {
    event.preventDefault();
    event.stopPropagation();
    const contactMenu = event.currentTarget.closest('.contact-menu');
    if (!contactMenu) return;
    const popup = contactMenu.querySelector('.phone-popup');
    if (popup) {
        popup.classList.toggle('show');
    }
}

function hidePhonePopup() {
    document.querySelectorAll('.phone-popup.show').forEach(popup => popup.classList.remove('show'));
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.contact-menu')) {
        hidePhonePopup();
    }
});

// Function to check if all required fields are filled
function checkFormValidity() {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.querySelector('.submit-btn');
    const paymentMethod = document.getElementById('paymentMethod');
    const customerAcc = document.getElementById('customerAcc');
    const senderName = document.getElementById('senderName');

    const isFormValid = form.checkValidity();
    const isPaymentValid = paymentMethod.checkValidity() && customerAcc.checkValidity() && senderName.checkValidity();

    if (isFormValid && isPaymentValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
    }
}

// Add event listeners to required fields
document.addEventListener('DOMContentLoaded', function() {
    const requiredFields = document.querySelectorAll('#bookingForm input[required], #bookingForm select[required], #paymentMethod, #customerAcc, #senderName');
    requiredFields.forEach(field => {
        field.addEventListener('input', checkFormValidity);
        field.addEventListener('change', checkFormValidity);
    });

    // Initial check
    checkFormValidity();
});