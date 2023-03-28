const mongoose = require('mongoose')
const { Schema } = mongoose

const stoolTypeSchema = new Schema({
    description: {
        type: String,
        unique: true,
        maxLength: 512
    },
    stoolSvg: {
        type: String,
        unqiue: true,
        maxLength: 1024
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required'],
        maxLength: 32
    }
})

module.exports = mongoose.model('StoolType', stoolTypeSchema)