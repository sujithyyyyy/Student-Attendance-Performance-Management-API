const Marks = require('../models/Marks');

// @desc    Add marks
// @route   POST /api/marks
// @access  Private (Teacher/Admin)
const addMarks = async (req, res) => {
    const { studentId, examType, subjects } = req.body;

    try {
        const marks = await Marks.create({
            studentId,
            examType,
            subjects,
        });

        res.status(201).json(marks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get marks by student
// @route   GET /api/marks/student/:studentId
// @access  Private
const getMarksByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const marks = await Marks.find({ studentId }).populate('studentId', 'name rollNumber');
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addMarks,
    getMarksByStudent,
};
