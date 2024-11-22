import React, { useState, useEffect } from 'react';
import './View.css';
import Swal from 'sweetalert2';

const ViewContact = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContactId, setEditingContactId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/contacts');
            const data = await res.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
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
                    await fetch(`http://localhost:5000/api/delete-contact/${id}`, {
                        method: 'DELETE',
                    });
                    setContacts(contacts.filter(contact => contact._id !== id));
                    Swal.fire('Deleted!', 'Your contact has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        });
    };

    const handleEdit = (contact) => {
        setEditingContactId(contact._id);
    };

    const handleUpdate = async (contact) => {
        try {
            const res = await fetch(`http://localhost:5000/api/update-contact/${contact._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            });

            if (res.ok) {
                Swal.fire('Updated!', 'Your contact has been updated.', 'success');
                fetchContacts();
                setEditingContactId(null);
            } else {
                throw new Error('Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            Swal.fire('Error!', 'There was an error updating the contact.', 'error');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter out ID and only filter by name, address, or info
    const filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.info.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="view-contact">
            <h2>View Contacts</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name, address, or info..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {loading ? (
                <p>Loading contacts...</p>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
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
                                        {editingContactId === contact._id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={contact.name}
                                                        onChange={(e) => contact.name = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={contact.phone}
                                                        onChange={(e) => contact.phone = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={contact.email}
                                                        onChange={(e) => contact.email = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={contact.address}
                                                        onChange={(e) => contact.address = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        defaultValue={new Date(contact.dob).toISOString().split('T')[0]}
                                                        onChange={(e) => contact.dob = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={contact.info}
                                                        onChange={(e) => contact.info = e.target.value}
                                                    />
                                                </td>
                                                <td>
                                                    <button onClick={() => handleUpdate(contact)}>Save</button>
                                                    <button onClick={() => setEditingContactId(null)}>Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{contact.name}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.address}</td>
                                                <td>{new Date(contact.dob).toLocaleDateString()}</td>
                                                <td>{contact.info}</td>
                                                <td className="actions">
                                                    <button onClick={() => handleEdit(contact)}>Edit</button>
                                                    <button onClick={() => handleDelete(contact._id)}>Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewContact;
