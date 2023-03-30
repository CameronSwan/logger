const mongoose = require('mongoose');
const { Schema } = mongoose;

const symptomSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'Symptom Name is Required'],
        maxLength: 32
    },
    description: {
        type: String,
        maxLength: 512
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Symptom', symptomSchema);