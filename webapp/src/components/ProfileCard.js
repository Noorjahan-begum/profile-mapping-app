import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { Link } from 'react-router-dom'; // Import Link

function ProfileCard({ profile }) {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className="profile-card">
            <img src={profile.photo} alt={profile.name} />
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <div className="profile-card-actions">
                <button onClick={() => setShowMap(true)} className="summary-button">
                    Summary
                </button>
                <Link to={`/profile/${profile.id}`} className="details-button">
                    Details
                </Link>
            </div>

            {showMap && (
                <MapComponent address={profile.address} onClose={() => setShowMap(false)} />
            )}
        </div>
    );
}

export default ProfileCard;