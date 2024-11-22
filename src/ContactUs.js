import React from 'react';
import './ContactUs.css'; // Import the CSS file

const ContactUs = () => {
    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <p>For any queries or support, please reach out to us at:</p>
            <p><strong>Email:</strong> <a href="mailto:anuradhap.22eie@kongu.edu">anuradhap.22eie@kongu.edu</a></p>
            <p><strong>Mobile:</strong> <a href="tel:0123456789">0123456789</a></p>
            <p><strong>Creator:</strong> Anuradha P</p>
            <p>We are here to help you manage your contacts efficiently!</p>
        </div>
    );
};

export default ContactUs;
