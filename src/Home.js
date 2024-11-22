// Home.js
import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Contact Manager Project</h1>
            <p>
                This project allows you to efficiently manage and organize your contacts. You can add, view, and search contacts stored in a MongoDB database.
            </p>
            <h2>Key Features:</h2>
            <ul>
                <li>Add new contacts with detailed information including name, phone number, email, address, and date of birth.</li>
                <li>Edit existing contacts to keep your information up-to-date.</li>
                <li>Delete contacts you no longer need with confirmation prompts.</li>
                <li>Search functionality to quickly find contacts based on name or address.</li>
                <li>Attractive and user-friendly interface designed with modern CSS.</li>
            </ul>
            <h2>Technologies Used:</h2>
            <p>
                This project is built using:
            </p>
            <ul>
                <li><strong>React.js</strong> for the frontend interface.</li>
                <li><strong>Node.js</strong> with Express for the backend API.</li>
                <li><strong>MongoDB</strong> for storing contact information.</li>
                <li><strong>CSS</strong> for styling the application.</li>
            </ul>
            <h2>Get Started:</h2>
            <p>
                To get started, navigate to the Add Contact section to begin managing your contacts. Enjoy!
            </p>
        </div>
    );
};

export default Home;
