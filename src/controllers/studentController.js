const Student = require('../models/Student');

// @desc    Create a new student
// @route   POST /api/students
// @access  Private (Admin/Teacher)
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all students with search, filter, pagination
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res) => {
    try {
        const { search, className, section, page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { rollNumber: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        if (className) {
            query.className = className;
        }

        if (section) {
            query.section = section;
        }

        const students = await Student.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Student.countDocuments(query);

        res.json({
            students,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalStudents: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin/Teacher)
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            await student.deleteOne();
            res.json({ message: 'Student removed' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
