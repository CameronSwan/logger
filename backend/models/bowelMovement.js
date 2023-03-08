const mongoose = require('mongoose')
const { Schema } = mongoose

const bowelMovementSchema = new Schema({
    date: {
        type: String,
        required: [true, 'Date is Required.']
    },
    time: {
        type: String,
        required: [true, 'Time is Required.']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserID is Required']
    },
    notes: {
        type: String
    },
    stoolTypes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'StoolType'
        }],
        required: [true, "Select at least 1 stool type."]
    },
    colors: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Color'
        }],
        required: [true, "Select at least 1 color."]
    },
    symptoms: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Symptom'
        }]
    }
})

module.exports = mongoose.model('BowelMovement', bowelMovementSchema)