const mongoose = require('mongoose')
const { Schema } = mongoose

const bowelMovementSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is Required.']
    },
    time: {
        type: Date,
        required: [true, 'Time is Required.']
    },
    userId: {
        type: Number,
        required: [true, 'UserID is Required']
    }
})

module.exports = mongoose.model('BowelMovement', bowelMovementSchema)