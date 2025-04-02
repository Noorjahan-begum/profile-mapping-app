import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`admin-dashboard ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <Sidebar isOpen={isSidebarOpen} />
            
            <div className="admin-content">
                <header className="admin-header">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <h1>Admin Dashboard</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </header>

                <nav className="admin-nav">
                    <Link to="/admin/profiles" className="nav-link">
                        <i className="fas fa-users"></i> Manage Profiles
                    </Link>
                    <Link to="/admin/settings" className="nav-link">
                        <i className="fas fa-cog"></i> Settings
                    </Link>
                </nav>

                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;