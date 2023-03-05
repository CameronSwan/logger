const mongoose = require('mongoose')
const { Schema } = mongoose

const stoolTypeSchema = new Schema({
    description: {
        type: Text,
        unique: true
    },
    stoolSvg: {
        type: String,
        unqiue: true
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required'],
    }
})

module.exports = mongoose.model('StoolType', stoolTypeSchema)