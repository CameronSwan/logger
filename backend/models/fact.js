const mongoose = require('mongoose');
const { Schema } = mongoose;

const factSchema = new Schema ({

    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
        unique: true
    }
});

module.exports = mongoose.model('Fact', factSchema);