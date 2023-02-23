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
        type: Number,
        required: [true, 'UserID is Required']
    },
    notes: {
        type: Text
    }
})

module.exports = mongoose.model('BowelMovement', bowelMovementSchema)