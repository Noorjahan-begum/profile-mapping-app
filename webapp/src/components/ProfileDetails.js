import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { profilesData } from '../data/profiles';
import './ProfileDetails.css';

function ProfileDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const profileId = parseInt(id, 10);
    const [profile, setProfile] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(null);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                const foundProfile = profilesData.find(p => p.id === profileId);
                if (foundProfile) {
                    setProfile(foundProfile);
                    setEditedProfile(foundProfile);
                }
                setLoading(false);
            } catch (error) {
                showNotification('Failed to load profile', 'error');
                setLoading(false);
            }
        };
        fetchProfile();
    }, [profileId]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (!profile) {
        return (
            <div className="profile-not-found">
                <h2>Profile Not Found</h2>
                <p>Sorry, we couldn't find the profile you're looking for.</p>
                <Link to="/" className="back-button">Back to Profiles</Link>
            </div>
        );
    }

    const handleImageError = () => {
        setImageError(true);
    };

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProfile({...profile});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedProfile(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: child === 'interests' ? value.split(',').map(i => i.trim()) : value
                }
            }));
        } else {
            setEditedProfile(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProfile(editedProfile);
            const profileIndex = profilesData.findIndex(p => p.id === profile.id);
            if (profileIndex !== -1) {
                profilesData[profileIndex] = editedProfile;
            }
            setIsEditing(false);
            showNotification('Profile updated successfully!');
        } catch (error) {
            showNotification('Failed to update profile', 'error');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this profile?')) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                const profileIndex = profilesData.findIndex(p => p.id === profile.id);
                if (profileIndex !== -1) {
                    profilesData.splice(profileIndex, 1);
                    showNotification('Profile deleted successfully!');
                    setTimeout(() => navigate('/'), 1500);
                }
            } catch (error) {
                showNotification('Failed to delete profile', 'error');
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    return (
        <div className="profile-details-container">
            {notification && (
            <div className={`notification ${notification.type}`}>
                {notification.message}
            </div>
        )}
            <div className="profile-details-card">
                {isEditing ? (
                    <div className="edit-form">
                        <h2>Edit Profile</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={editedProfile.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={editedProfile.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="details.email"
                                value={editedProfile.details.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="tel"
                                name="details.phone"
                                value={editedProfile.details.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={editedProfile.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Interests (comma-separated):</label>
                            <input
                                type="text"
                                name="details.interests"
                                value={editedProfile.details.interests.join(', ')}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-actions">
                            <button className="save-button" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save Changes
                            </button>
                            <button className="cancel-button" onClick={handleCancel}>
                                <i className="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="profile-photo-container">
                            {!imageError ? (
                                <img
                                    src={profile.photo || '/default-avatar.png'}
                                    alt={profile.name}
                                    className="profile-details-photo"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="profile-photo-fallback">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="profile-header">
                            <h2>{profile.name}</h2>
                            <span className="profile-status">Active</span>
                        </div>

                        <p className="profile-details-description">{profile.description}</p>

                        <div className="profile-details-info">
                            {profile.details.email && (
                                <div className="info-item">
                                    <i className="fas fa-envelope"></i>
                                    <a href={`mailto:${profile.details.email}`}>
                                        {profile.details.email}
                                    </a>
                                </div>
                            )}

                            {profile.details.phone && (
                                <div className="info-item">
                                    <i className="fas fa-phone"></i>
                                    <a href={`tel:${profile.details.phone}`}>
                                        {profile.details.phone}
                                    </a>
                                </div>
                            )}

                            {profile.details.interests && profile.details.interests.length > 0 && (
                                <div className="info-item">
                                    <i className="fas fa-star"></i>
                                    <div className="interests-container">
                                        {profile.details.interests.map((interest, index) => (
                                            <span key={index} className="interest-tag">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="info-item address-section">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>{profile.address}</p>
                                <button 
                                    className="map-toggle-button"
                                    onClick={toggleMap}
                                >
                                    {showMap ? 'Hide Map' : 'Show Map'}
                                </button>
                            </div>
                        </div>

                        {showMap && (
                            <div className="map-container">
                                <div className="map-placeholder">
                                    Map loading...
                                </div>
                            </div>
                        )}

                <div className="profile-actions">
                    <Link to="/" className="back-button">
                        <i className="fas fa-arrow-left"></i> Back to Profiles
                    </Link>
                    <div className="action-buttons">
                        <button className="edit-button" onClick={handleEditClick}>
                            <i className="fas fa-edit"></i> Edit Profile
                        </button>
                        <button className="delete-button" onClick={handleDelete}>
                            <i className="fas fa-trash"></i> Delete Profile
                        </button>
                </div>
            </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileDetails;