const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema ({

    hexCode: {
        unique: true,
        type: String,
    },
    name: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Color', colorSchema);