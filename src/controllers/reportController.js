const Attendance = require('../models/Attendance');
const Marks = require('../models/Marks');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// @desc    Get attendance summary
// @route   GET /api/reports/attendance-summary
// @access  Private (Admin/Teacher)
const getAttendanceSummary = async (req, res) => {
    try {
        const totalClasses = await Attendance.countDocuments();
        const attendanceRecords = await Attendance.find();

        let totalPresent = 0;
        let totalAbsent = 0;
        let totalLate = 0;

        attendanceRecords.forEach((record) => {
            record.records.forEach((student) => {
                if (student.status === 'Present') totalPresent++;
                if (student.status === 'Absent') totalAbsent++;
                if (student.status === 'Late') totalLate++;
            });
        });

        res.json({
            totalClasses,
            totalPresent,
            totalAbsent,
            totalLate,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get top performers
// @route   GET /api/reports/top-performers
// @access  Private (Admin/Teacher)
const getTopPerformers = async (req, res) => {
    try {
        const marks = await Marks.find().populate('studentId', 'name rollNumber');

        // Calculate average marks for each student
        const studentPerformance = {};

        marks.forEach((mark) => {
            const studentId = mark.studentId._id.toString();
            if (!studentPerformance[studentId]) {
                studentPerformance[studentId] = {
                    student: mark.studentId,
                    totalMarks: 0,
                    totalSubjects: 0,
                };
            }

            mark.subjects.forEach((subject) => {
                studentPerformance[studentId].totalMarks += subject.marksObtained;
                studentPerformance[studentId].totalSubjects += 1;
            });
        });

        const rankedStudents = Object.values(studentPerformance)
            .map((sp) => ({
                student: sp.student,
                averageMarks: sp.totalMarks / sp.totalSubjects,
            }))
            .sort((a, b) => b.averageMarks - a.averageMarks)
            .slice(0, 5); // Top 5

        res.json(rankedStudents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard summary
// @route   GET /api/reports/dashboard-summary
// @access  Private (Admin)
const getDashboardSummary = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalClasses = await Attendance.distinct('className'); // Approximate classes count

        res.json({
            totalStudents,
            totalTeachers,
            totalClasses: totalClasses.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAttendanceSummary,
    getTopPerformers,
    getDashboardSummary,
};
