const mongoose = require('mongoose');
const { Schema } = mongoose;

const bowelMovementStoolTypeSchema = new Schema ({
    bowelMovementId: {
        type: Schema.Types.ObjectId,
        ref: 'BowelMovement'
    },
    stoolTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'StoolType'
    }
});

module.exports = mongoose.model('BowelMovementStoolType', bowelMovementStoolTypeSchema);