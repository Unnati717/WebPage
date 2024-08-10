const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    startTime: String,
    endTime: String,
    timezone: String,
    adminTimezone: String,
});

module.exports = mongoose.model('Shift', shiftSchema);
