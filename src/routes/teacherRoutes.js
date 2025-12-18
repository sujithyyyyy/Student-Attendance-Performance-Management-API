const express = require('express');
const router = express.Router();
const {
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('admin'), createTeacher)
    .get(protect, getTeachers);

router.route('/:id')
    .put(protect, authorize('admin'), updateTeacher)
    .delete(protect, authorize('admin'), deleteTeacher);

module.exports = router;
