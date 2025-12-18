const express = require('express');
const router = express.Router();
const {
    markAttendance,
    updateAttendance,
    getAttendanceByClass,
    getAttendanceByStudent,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/mark', protect, authorize('admin', 'teacher'), markAttendance);
router.put('/update/:id', protect, authorize('admin', 'teacher'), updateAttendance);
router.get('/class/:className', protect, getAttendanceByClass);
router.get('/student/:studentId', protect, getAttendanceByStudent);

module.exports = router;
