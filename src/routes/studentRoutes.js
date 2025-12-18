const express = require('express');
const router = express.Router();
const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('admin', 'teacher'), createStudent)
    .get(protect, getStudents);

router.route('/:id')
    .get(protect, getStudentById)
    .put(protect, authorize('admin', 'teacher'), updateStudent)
    .delete(protect, authorize('admin'), deleteStudent);

module.exports = router;
