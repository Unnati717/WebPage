import React, { useState } from 'react';
import axios from 'axios';

function AdminShifts() {
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        timezone: '',
        employeeId: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/shifts', formData, {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            alert('Shift created successfully');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            <input type="time" onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
            <input type="time" onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
            <input type="text" placeholder="Timezone" onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} />
            <select onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}>
                {/* Populate with employee list */}
            </select>
            <button type="submit">Create Shift</button>
        </form>
    );
}

export default AdminShifts;
