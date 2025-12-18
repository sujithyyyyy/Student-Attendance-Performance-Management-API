const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    className: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
