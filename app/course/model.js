const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdate = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdate);

let courseSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Title harus diisi']
    },
    slug: {
        type: String,
        slug: "title"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    slogan: {
        type: String,
        require: [true, 'slogan harus diisi']
    },
    description: {
        type: String,
        require: [true, 'description harus diisi']
    },
    keypoint: {
        type: String,
        require: [true, 'keypoint harus diisi']
    },
    designedfor: {
        type: String,
        require: [true, 'designedfor harus diisi']
    },
    tools: {
        type: String,
        require: [true, 'tools harus diisi']
    },
    price: {
        type: Number,
        require: [true, 'price harus diisi']
    },
    discount: {
        type: Number,
        require: [true, 'discount harus diisi']
    },
    status: {
        type: String,
        default: 'Published'
    },
    photo: { 
        type: String, 
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);