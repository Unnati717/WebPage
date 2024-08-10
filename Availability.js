const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    startTime: String,
    endTime: String,
    timezone: String,
});

module.exports = mongoose.model('Availability', availabilitySchema);
