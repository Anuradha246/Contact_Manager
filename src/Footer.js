// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} KEC. All rights reserved.</p>
            <p>
                <a href="/contact-us">Contact Us</a> | 
                <a href="/privacy-policy">Privacy Policy</a> | 
                <a href="/terms-of-service">Terms of Service</a>
            </p>
        </footer>
    );
};

export default Footer;
