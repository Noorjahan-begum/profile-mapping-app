// Admin credentials - in a real app, these would be stored securely on a server
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // In production, use hashed passwords
};

export const validateCredentials = (username, password) => {
    return username === ADMIN_CREDENTIALS.username && 
           password === ADMIN_CREDENTIALS.password;
};

export const setAuthToken = () => {
    const token = generateToken();
    localStorage.setItem('adminToken', token);
    localStorage.setItem('isAdmin', 'true');
};

export const clearAuth = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
};

export const isAuthenticated = () => {
    return localStorage.getItem('adminToken') !== null;
};

// Helper function to generate a simple token
const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};