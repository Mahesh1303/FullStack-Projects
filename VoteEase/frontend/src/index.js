import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NomineeProvider } from './NomineeContext'; // Adjust the import path as needed
import AdminDashboard from './components/pages/AdminDashboard';
import UserDashboard from './components/pages/UserDashboard';
import App from './App'; // Your main app component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <NomineeProvider>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
                {/* Add other routes here */}
            </Routes>
        </NomineeProvider>
    </Router>
);
