const mongoose = require('mongoose');

let memberRouter = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    status: {
        type: String,
        enum: ['Aktif', 'NonAktif'],
        default: 'Aktif'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Member', memberRouter);