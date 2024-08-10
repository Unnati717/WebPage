import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeAvailability() {
    const [availability, setAvailability] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        timezone: ''
    });

    const fetchAvailability = async () => {
        const res = await axios.get('/api/employee/availability', {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        setAvailability(res.data);
    };

    useEffect(() => {
        fetchAvailability();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/employee/availability', formData, {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            fetchAvailability();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                <input type="time" onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
                <input type="time" onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
                <input type="text" placeholder="Timezone" onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} />
                <button type="submit">Create Availability</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {availability.map((slot, index) => (
                        <tr key={index}>
                            <td>{slot.date}</td>
                            <td>{slot.startTime}</td>
                            <td>{slot.endTime}</td>
                            <td>{slot.timezone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeAvailability;
