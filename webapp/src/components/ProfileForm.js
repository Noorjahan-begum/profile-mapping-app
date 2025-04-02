import React, { useState } from 'react';
import './ProfileForm.css';

function ProfileForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        photo: '',
        email: '',
        phone: '',
        address: '',
        interests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="profile-form">
            <h2>Add/Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="photo">Photo URL:</label>
                    <input 
                        type="url" 
                        id="photo" 
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="interests">Interests:</label>
                    <input 
                        type="text" 
                        id="interests" 
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        placeholder="Separate interests with commas"
                    />
                </div>

                <button type="submit" className="submit-button">Save Profile</button>
            </form>
        </div>
    );
}

export default ProfileForm;