const mongoose = require('mongoose');
const { Schema } = mongoose;

const symptomSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'Symptom Name is Required']
    },
    description: {
        type: Text
    },
    userId: {
        type: Number
    }
});

module.exports = mongoose.model('Symptom', symptomSchema);