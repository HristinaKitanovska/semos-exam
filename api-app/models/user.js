const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);