import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profilesData } from '../data/profiles';
import './ProfileList.css';

function ProfileList() {
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching profiles
        const fetchProfiles = async () => {
            try {
                // Simulating API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProfiles(profilesData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load profiles');
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.description.toLowerCase().includes(searchTerm)
    );

    if (loading) {
        return <div className="loading">Loading profiles...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-list">
            <h1>Profiles</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search profiles..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="profile-grid">
                {filteredProfiles.length > 0 ? (
                    filteredProfiles.map(profile => (
                        <div key={profile.id} className="profile-card">
                            <img
                                src={profile.photo || '/default-avatar.png'}
                                alt={profile.name}
                                className="profile-photo"
                            />
                            <h3>{profile.name}</h3>
                            <p>{profile.description}</p>
                            <Link 
                                to={`/profile/${profile.id}`}
                                className="view-profile-button"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No profiles found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileList;