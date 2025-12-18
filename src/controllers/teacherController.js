const Teacher = require('../models/Teacher');

// @desc    Create a new teacher
// @route   POST /api/teachers
// @access  Private (Admin)
const createTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private (Admin)
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private (Admin)
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (teacher) {
            await teacher.deleteOne();
            res.json({ message: 'Teacher removed' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
};
