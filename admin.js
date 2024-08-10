const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../models/User');
const Availability = require('../models/Availability');
const Shift = require('../models/Shift');
const moment = require('moment-timezone');

// View Employee Availability
router.get('/availability/:employeeId', verify, async (req, res) => {
    const employee = await User.findById(req.params.employeeId);
    const availability = await Availability.find({ user: req.params.employeeId });

    const formattedAvailability = availability.map(slot => {
        const employeeTime = moment.tz(`${slot.date} ${slot.startTime}`, slot.timezone);
        const adminTime = employeeTime.clone().tz(req.query.timezone || slot.timezone);

        return {
            date: slot.date,
            employeeAvailability: `${employeeTime.format('h:mm A')} - ${employeeTime.clone().add(slot.endTime - slot.startTime, 'hours').format('h:mm A')} (${slot.timezone})`,
            adminAvailability: `${adminTime.format('h:mm A')} - ${adminTime.clone().add(slot.endTime - slot.startTime, 'hours').format('h:mm A')} (${req.query.timezone || slot.timezone})`,
        };
    });

    res.send({
        employeeTimezone: employee.timezone,
        availability: formattedAvailability,
    });
});

// Create Shift
router.post('/shifts', verify, async (req, res) => {
    const employee = await User.findById(req.body.employeeId);
    const adminTimezone = req.body.timezone;
    const employeeAvailability = await Availability.findOne({
        user: req.body.employeeId,
        date: req.body.date,
    });

    const shiftStartTime = moment.tz(`${req.body.date} ${req.body.startTime}`, adminTimezone);
    const shiftEndTime = shiftStartTime.clone().add(req.body.endTime - req.body.startTime, 'hours');

    const employeeStartTime = shiftStartTime.clone().tz(employee.timezone);
    const employeeEndTime = shiftEndTime.clone().tz(employee.timezone);

    if (employeeStartTime.isBefore(moment.tz(`${employeeAvailability.date} ${employeeAvailability.startTime}`, employee.timezone)) ||
        employeeEndTime.isAfter(moment.tz(`${employeeAvailability.date} ${employeeAvailability.endTime}`, employee.timezone))) {
        return res.status(400).send('Shift does not match employee availability');
    }

    const shift = new Shift({
        employee: req.body.employeeId,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        timezone: adminTimezone,
        adminTimezone: adminTimezone,
    });

    try {
        const savedShift = await shift.save();
        res.send(savedShift);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
