import React from 'react';
import './Analytics.css';

function Analytics() {
    return (
        <div className="analytics-container">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>Total Profiles</h3>
                    <p className="analytics-number">150</p>
                </div>
                <div className="analytics-card">
                    <h3>Active Users</h3>
                    <p className="analytics-number">87</p>
                </div>
                <div className="analytics-card">
                    <h3>New This Month</h3>
                    <p className="analytics-number">24</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;