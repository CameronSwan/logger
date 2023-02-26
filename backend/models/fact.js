const mongoose = require('mongoose');
const { Schema } = mongoose;

const factSchema = new Schema ({
    factId: {
        type: Number,
        required: [true, 'Fact ID is Required']
    },
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    description: {
        type: Text,
        required: [true, 'Description is Required'],
        unique: true
    }
});

module.exports = mongoose.model('Fact', factSchema);