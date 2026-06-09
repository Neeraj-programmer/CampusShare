const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { resourceId, date, startTime, endTime, purpose } = req.body;
    const requestedStart = timeToMinutes(startTime);
    const requestedEnd = timeToMinutes(endTime);
    if (requestedStart >= requestedEnd) {
       return res.status(400).json({ message: 'Start time must be before end time' });
    }
    const existingBookings = await Booking.find({
      resourceId,
      date,
      status: { $in: ['Pending', 'Approved'] }
    });
    let hasConflict = false;
    for (let booking of existingBookings) {
      const existingStart = timeToMinutes(booking.startTime);
      const existingEnd = timeToMinutes(booking.endTime);
      if (requestedStart < existingEnd && requestedEnd > existingStart) {
        hasConflict = true;
        break;
      }
    }
    if (hasConflict) {
      return res.status(400).json({ message: 'This resource is already booked for the selected time slot. Please choose another time.' });
    }
    const newBooking = new Booking({
      resourceId,
      userId: req.user.id,
      date,
      startTime,
      endTime,
      purpose,
      status: 'Pending'
    });
    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('resourceId', 'resourceName location')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email rollNumber')
      .populate('resourceId', 'resourceName')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.put('/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.put('/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/idle-resources', authMiddleware, async (req, res) => {
  try {
    const bookingCounts = await Booking.aggregate([
      { $group: { _id: "$resourceId", count: { $sum: 1 } } }
    ]);
    const allResources = await Resource.find();
    const resourceUsage = allResources.map(resource => {
      const found = bookingCounts.find(b => b._id.toString() === resource._id.toString());
      return {
        ...resource._doc,
        bookingCount: found ? found.count : 0
      };
    });
    resourceUsage.sort((a, b) => a.bookingCount - b.bookingCount);
    res.json(resourceUsage.slice(0, 5));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/fair-warning/:bookingId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diffToMonday));
    startOfWeek.setHours(0,0,0,0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23,59,59,999);
    const startStr = startOfWeek.toISOString().split('T')[0];
    const endStr = endOfWeek.toISOString().split('T')[0];
    const count = await Booking.countDocuments({
      userId: booking.userId,
      resourceId: booking.resourceId,
      date: { $gte: startStr, $lte: endStr }
    });
    if (count > 2) {
      return res.json({ warning: true, message: `Fair Access Warning: This student has already booked this resource ${count} times this week. Please review before approving.` });
    }
    res.json({ warning: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
