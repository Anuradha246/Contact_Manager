import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AddContact.css';

const AddContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        dob: '',
        info: '' // Added info field
    });

    const MySwal = withReactContent(Swal); // Initialize SweetAlert2 with React Content

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to check for duplicate entries (Phone or Email)
    const checkForDuplicate = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/check-duplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: formData.phone,
                    email: formData.email,
                }),
            });

            const result = await response.json();
            if (result.duplicate) {
                MySwal.fire({
                    title: 'Duplicate Entry!',
                    text: 'A contact with this phone or email already exists.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    position: 'center',
                });
                return false; // Prevent form submission
            }
            return true; // No duplicates found, proceed
        } catch (error) {
            console.error('Error:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'An error occurred while checking for duplicates.',
                icon: 'error',
                confirmButtonText: 'OK',
                position: 'center',
            });
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for duplicates before submitting the form
        const noDuplicate = await checkForDuplicate(formData);
        if (!noDuplicate) return; // Stop if duplicates are found

        // Format the date to exclude the timestamp
        const formattedData = {
            ...formData,
            dob: formData.dob.split('T')[0], // Ensure only the date part is sent
        };

        try {
            const response = await fetch('http://localhost:5000/api/add-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                // SweetAlert2 success popup
                MySwal.fire({
                    title: 'Success!',
                    text: 'Contact added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    position: 'center', // Center the popup on the screen
                });

                // Clear form after successful addition
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    dob: '',
                    info: '' // Clear info field
                });
            } else {
                // SweetAlert2 error popup
                MySwal.fire({
                    title: 'Error!',
                    text: 'Error adding contact',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    position: 'center', // Center the popup on the screen
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // SweetAlert2 error popup for network or server errors
            MySwal.fire({
                title: 'Error!',
                text: 'Error adding contact',
                icon: 'error',
                confirmButtonText: 'OK',
                position: 'center', // Center the popup on the screen
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-contact">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Info:</label>
                    <input
                        type="text"
                        name="info"
                        value={formData.info}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
