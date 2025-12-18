const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    examType: {
        type: String,
        required: true,
        enum: ['Midterm', 'Final', 'Unit Test'],
    },
    subjects: [
        {
            subjectName: {
                type: String,
                required: true,
            },
            marksObtained: {
                type: Number,
                required: true,
            },
            totalMarks: {
                type: Number,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
