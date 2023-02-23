const mongoose = require('mongoose')
const { Schema } = mongoose

const stoolTypeSchema = new Schema({
    description: {
        type: Text
    },
    stoolSvg: {
        type: String
    }
})

module.exports = mongoose.model('StoolType', stoolTypeSchema)