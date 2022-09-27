const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name harus diisi']
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);