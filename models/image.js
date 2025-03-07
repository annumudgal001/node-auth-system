const mongoose = require('mongoose');

const imageschema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicid: { // Correct: Uses publicid
        type: String,
        required: true
    },
    uploadedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('image', imageschema);