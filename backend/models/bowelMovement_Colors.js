const mongoose = require('mongoose');
const { Schema } = mongoose;

const bowelMovementColorSchema = new Schema ({
    bowelMovementId: {
        type: Schema.Types.ObjectId,
        ref: 'BowelMovement'
    },
    colorId: {
        type: Schema.Types.ObjectId,
        ref: 'Color'
    }
});

module.exports = mongoose.model('BowelMovementColor', bowelMovementColorSchema);