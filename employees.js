const router = require('express').Router();
const verify = require('../verifyToken');
const Availability = require('../models/Availability');
const Shift = require('../models/Shift');
const moment = require('moment-timezone');

// Create Availability
router.post('/availability', verify, async (req, res) => {
    const availability = new Availability({
        user: req.user._id,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        timezone: req.body.timezone,
    });

    try {
        const savedAvailability = await availability.save();
        res.send(savedAvailability);
    } catch (err) {
        res.status(400).send(err);
    }
});

// View Assigned Shifts
router.get('/shifts', verify, async (req, res) => {
    const shifts = await Shift.find({ employee: req.user._id });

    const formattedShifts = shifts.map(shift => {
        const employeeTime = moment.tz(`${shift.date} ${shift.startTime}`, shift.timezone);
        const adminTime = employeeTime.clone().tz(shift.adminTimezone);

        return {
            date: shift.date,
            employeeShift: `${employeeTime.format('h:mm A')} - ${employeeTime.clone().add(shift.endTime - shift.startTime, 'hours').format('h:mm A')} (${shift.timezone})`,
            adminShift: `${adminTime.format('h:mm A')} - ${adminTime.clone().add(shift.endTime - shift.startTime, 'hours').format('h:mm A')} (${shift.adminTimezone})`,
        };
    });

    res.send(formattedShifts);
});

module.exports = router;
