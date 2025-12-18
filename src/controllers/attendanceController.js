const Attendance = require('../models/Attendance');

// @desc    Mark attendance
// @route   POST /api/attendance/mark
// @access  Private (Teacher/Admin)
const markAttendance = async (req, res) => {
    const { date, className, section, records } = req.body;

    try {
        // Check if attendance already exists for this date/class/section
        const existingAttendance = await Attendance.findOne({
            date: new Date(date),
            className,
            section,
        });

        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked for this date and class' });
        }

        const attendance = await Attendance.create({
            date: new Date(date),
            className,
            section,
            records,
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update attendance
// @route   PUT /api/attendance/update/:id
// @access  Private (Teacher/Admin)
const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (attendance) {
            res.json(attendance);
        } else {
            res.status(404).json({ message: 'Attendance record not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get attendance by class
// @route   GET /api/attendance/class/:className
// @access  Private
const getAttendanceByClass = async (req, res) => {
    const { className } = req.params;
    const { date, section } = req.query;

    try {
        const query = { className };
        if (date) query.date = new Date(date);
        if (section) query.section = section;

        const attendance = await Attendance.find(query).populate('records.studentId', 'name rollNumber');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get attendance by student
// @route   GET /api/attendance/student/:studentId
// @access  Private
const getAttendanceByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const attendance = await Attendance.find({
            'records.studentId': studentId,
        }).select('date className section records.$');

        // Filter out the specific student's record from the array
        const studentAttendance = attendance.map(record => ({
            date: record.date,
            className: record.className,
            section: record.section,
            status: record.records[0].status, // Since we used records.$
        }));

        res.json(studentAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    markAttendance,
    updateAttendance,
    getAttendanceByClass,
    getAttendanceByStudent,
};
