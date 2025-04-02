import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import './App.css';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './components/Settings';
import Analytics from './components/Analytics';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ProfileList />} />
                    <Route path="/profile/:id" element={<ProfileDetails />} />
                    <Route path="/login" element={<Login />} />


                    {/* Admin Panel Routes (Placeholders) */}
                    <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            }>
                <Route path="profiles" element={<ProfileList isAdminPanel={true} />} />
                <Route path="settings" element={<Settings />} />
                <Route path="analytics" element={<Analytics />} />
            </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;