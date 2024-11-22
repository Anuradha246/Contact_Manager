import React, { useState, useEffect } from 'react';
import './View.css';
import Swal from 'sweetalert2';

const ViewContact = () => {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [updatedContact, setUpdatedContact] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/contacts');
            const data = await res.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleDelete = async (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:5000/api/delete-contact/${_id}`, {
                        method: 'DELETE',
                    });
                    setContacts(contacts.filter(contact => contact._id !== _id));
                    Swal.fire('Deleted!', 'Your contact has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        });
    };

    const handleEdit = async (contact) => {
        setEditContact(contact);
        setUpdatedContact(contact);
    };

    const handleUpdate = async () => {
        if (editContact) {
            try {
                const res = await fetch(`http://localhost:5000/api/update-contact/${editContact._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedContact),
                });

                if (res.ok) {
                    Swal.fire('Updated!', 'Your contact has been updated.', 'success');
                    fetchContacts(); // Refresh the contacts
                    setEditContact(null); // Reset the edit contact state
                } else {
                    const responseData = await res.json();
                    Swal.fire('Error!', responseData.message || 'There was an error updating the contact.', 'error');
                }
            } catch (error) {
                console.error('Error updating contact:', error);
                Swal.fire('Error!', 'There was an error updating the contact.', 'error');
            }
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact._id.includes(searchTerm) // Use _id instead of id
        );
    });

    return (
        <div className="view-contact">
            <h2>View Contacts</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name, address, or ID..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Info</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact._id}>
                            <td>{contact._id}</td> {/* Use _id instead of id */}
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td>{contact.address}</td>
                            <td>{new Date(contact.dob).toLocaleDateString()}</td>
                            <td>{contact.info}</td>
                            <td>
                                <button onClick={() => handleEdit(contact)}>Edit</button>
                                <button onClick={() => handleDelete(contact._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editContact && (
                <div className="edit-contact">
                    <h3>Edit Contact</h3>
                    <input 
                        type="text" 
                        value={updatedContact.name} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })} 
                        placeholder="Name" 
                    />
                    <input 
                        type="text" 
                        value={updatedContact.phone} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })} 
                        placeholder="Phone" 
                    />
                    <input 
                        type="email" 
                        value={updatedContact.email} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })} 
                        placeholder="Email" 
                    />
                    <input 
                        type="text" 
                        value={updatedContact.address} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, address: e.target.value })} 
                        placeholder="Address" 
                    />
                    <input 
                        type="date" 
                        value={updatedContact.dob?.split('T')[0] || ''} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, dob: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        value={updatedContact.info} 
                        onChange={(e) => setUpdatedContact({ ...updatedContact, info: e.target.value })} 
                        placeholder="Info" 
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditContact(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ViewContact;
