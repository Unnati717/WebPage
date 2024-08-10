import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeAvailability from './pages/EmployeeAvailability';
import EmployeeShifts from './pages/EmployeeShifts';
import AdminAvailability from './pages/AdminAvailability';
import AdminShifts from './pages/AdminShifts';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/employee/availability" element={<EmployeeAvailability />} />
                <Route path="/employee/shifts" element={<EmployeeShifts />} />
                <Route path="/admin/availability" element={<AdminAvailability />} />
                <Route path="/admin/shifts" element={<AdminShifts />} />
            </Routes>
        </Router>
    );
}

export default App;
