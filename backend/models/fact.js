const mongoose = require('mongoose');
const { Schema } = mongoose;

const factSchema = new Schema ({

    title: {
        type: String,
        required: [true, 'Title is Required'],
        maxLength: 32
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
        unique: true,
        maxLength: 512
    }
});

module.exports = mongoose.model('Fact', factSchema);