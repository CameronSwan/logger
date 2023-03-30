const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema ({

    hexCode: {
        type: String,
        unique: true,
        maxLength: 7
    },
    name: {
        type: String,
        unique: true,
        maxLength: 32
    }
});

module.exports = mongoose.model('Color', colorSchema);