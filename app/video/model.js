const mongoose = require('mongoose');

let videoRouter = mongoose.Schema({
    partvideo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partvideo'
    },
    title: {
        type: String,
        require: [true, 'Title harus diisi']
    },
    link: {
        type: String,
        require: [true, 'Link harus diisi']
    },
    order: {
        type: Number,
        default: 0
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
},
    { timestamps: true }    
);

module.exports = mongoose.model('Video', videoRouter);