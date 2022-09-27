const mongoose = require('mongoose');

let partvideoRouter = mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    title: {
        type: String,
        require: [true, 'Title harus diisi']
    },
    order: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Partvideo', partvideoRouter);