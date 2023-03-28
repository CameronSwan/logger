const mongoose = require('mongoose');
const { Schema } = mongoose;

const factSchema = new Schema ({
    description: {
        type: String,
        required: [true, 'Description is Required'],
        unique: true,
        maxLength: 512
    }
});

module.exports = mongoose.model('Fact', factSchema);