const mongoose = require('mongoose');
const { Schema } = mongoose;

const symptomSchema = new Schema ({
    symptomId: {
        type: Number,
        required: [true, 'Symptom ID is Required']
    },
    name: {
        type: String,
        required: [true, 'Symptom Name is Required']
    },
    description: {
        type: Text,
        unique: true
    },
    userId: {
        type: Number,
        required: [true, 'User ID is Required']
    }
});

module.exports = mongoose.model('Symptom', symptomSchema);