const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema ({
    colorId: {
        type: Number,
        required: [true, 'Color ID is Required']
    },
    hexCode: {
        type: String,
        required: [true, 'Color HexCode is Required']
    },
    name: {
        type: String,
        required: [true, 'Color Name is Required']
    }
});

module.exports = mongoose.model('Color', colorSchema);