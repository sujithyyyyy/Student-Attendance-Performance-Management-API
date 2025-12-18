const express = require('express');
const router = express.Router();
const {
    getAttendanceSummary,
    getTopPerformers,
    getDashboardSummary,
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/attendance-summary', protect, authorize('admin', 'teacher'), getAttendanceSummary);
router.get('/top-performers', protect, authorize('admin', 'teacher'), getTopPerformers);
router.get('/dashboard-summary', protect, authorize('admin'), getDashboardSummary);

module.exports = router;
