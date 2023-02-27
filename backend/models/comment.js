const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema ({

    description: {
        type: Text,
        required: [true, 'Description is Required'],
        unique: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);