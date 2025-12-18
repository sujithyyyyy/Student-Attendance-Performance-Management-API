const express = require('express');
const router = express.Router();
const {
    addMarks,
    getMarksByStudent,
} = require('../controllers/marksController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'teacher'), addMarks);
router.get('/student/:studentId', protect, getMarksByStudent);

module.exports = router;
