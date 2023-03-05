const mongoose = require('mongoose');
const { Schema } = mongoose;

const symptomSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'Symptom Name is Required']
    },
    description: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Symptom', symptomSchema);