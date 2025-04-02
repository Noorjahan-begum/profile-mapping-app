import React from 'react';
import './Settings.css';

function Settings() {
    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div className="settings-content">
                <div className="settings-section">
                    <h3>General Settings</h3>
                    <form>
                        <div className="form-group">
                            <label>Site Name</label>
                            <input type="text" defaultValue="Profile Mapper" />
                        </div>
                        <div className="form-group">
                            <label>Email Notifications</label>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;