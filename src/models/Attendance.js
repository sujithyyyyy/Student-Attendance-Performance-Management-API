const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    className: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    records: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent', 'Late'],
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});

// Compound index to ensure unique attendance per class per date
attendanceSchema.index({ date: 1, className: 1, section: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
