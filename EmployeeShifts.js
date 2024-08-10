import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeShifts() {
    const [shifts, setShifts] = useState([]);

    const fetchShifts = async () => {
        const res = await axios.get('/api/employee/shifts', {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        setShifts(res.data);
    };

    useEffect(() => {
        fetchShifts();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Employee Shift</th>
                    <th>Admin Shift</th>
                </tr>
            </thead>
            <tbody>
                {shifts.map((shift, index) => (
                    <tr key={index}>
                        <td>{shift.date}</td>
                        <td>{shift.employeeShift}</td>
                        <td>{shift.adminShift}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeShifts;
