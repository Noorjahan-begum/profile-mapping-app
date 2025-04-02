import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen }) {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/profiles', icon: 'fas fa-users', label: 'Profiles' },
        { path: '/admin/settings', icon: 'fas fa-cog', label: 'Settings' },
        { path: '/admin/analytics', icon: 'fas fa-chart-bar', label: 'Analytics' }
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? '' : 'collapsed'}`}>
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <i className={item.icon}></i>
                        <span className="sidebar-label">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="sidebar-footer">
                <p>© 2024 Profile Mapper</p>
            </div>
        </aside>
    );
}

export default Sidebar;