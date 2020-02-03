const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    start_time: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    end_time: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = { List }