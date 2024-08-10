import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAvailability() {
    const [availability, setAvailability] = useState([]);
    const [timezone, setTimezone] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const fetchAvailability = async () => {
        const res = await axios.get(`/api/admin/availability/${employeeId}?timezone=${timezone}`, {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        setAvailability(res.data.availability);
    };

    useEffect(() => {
        if (employeeId) fetchAvailability();
    }, [employeeId, timezone]);

    return (
        <div>
            <select onChange={(e) => setEmployeeId(e.target.value)}>
                {/* Populate with employee list */}
            </select>
            <input type="text" placeholder="Timezone" onChange={(e) => setTimezone(e.target.value)} />
            <button onClick={fetchAvailability}>Fetch Availability</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee Availability</th>
                        <th>Admin Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {availability.map((slot, index) => (
                        <tr key={index}>
                            <td>{slot.date}</td>
                            <td>{slot.employeeAvailability}</td>
                            <td>{slot.adminAvailability}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAvailability;
