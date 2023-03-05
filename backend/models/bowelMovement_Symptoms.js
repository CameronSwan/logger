const mongoose = require('mongoose');
const { Schema } = mongoose;

const bowelMovementSymptomSchema = new Schema ({
    bowelMovementId: {
        type: Schema.Types.ObjectId,
        ref: 'BowelMovement'
    },
    symptomId: {
        type: Schema.Types.ObjectId,
        ref: 'Symptom'
    }
});

module.exports = mongoose.model('BowelMovementSymptom', bowelMovementSymptomSchema);