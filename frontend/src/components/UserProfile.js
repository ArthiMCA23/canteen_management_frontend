import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import user icon
import '../styles/UserProfile.css';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }
console.log(token)
        fetch('https://canteen-managent-backend.onrender.com/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    setName(data.user.name);
                    setPhone(data.user.phone);
                    setLoading(false);
                } else {
                    setError(data.message || 'Error fetching user profile');
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError('Error fetching user profile: ' + error.message);
                setLoading(false);
            });
    }, [token]);

    const handleUpdateProfile = () => {
        fetch('https://canteen-managent-backend.onrender.com/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    setIsEditing(false);
                } else {
                    setError('Error updating profile: ' + data.message);
                }
            })
            .catch((error) => {
                setError('Error updating profile: ' + error.message);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (<><br/><br/><br/>
        <div className="profile-wrapper">
            <div className="profile-header-section">
                <FontAwesomeIcon icon={faUserCircle} size="5x" className="profile-avatar" />
                <h1>Profile</h1>
            </div>
            {isEditing ? (
                <div className="profile-edit-section">
                    <label className="form-label">Name: </label>
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-label">Phone: </label>
                    <input
                        className="form-input"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button className="save-button" onClick={handleUpdateProfile}>Save</button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="profile-display-section">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
        </>);
}

export default UserProfile;
