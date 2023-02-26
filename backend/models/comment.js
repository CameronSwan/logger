const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema ({
    commentId: {
        type: Number,
        required: [true, 'Comment ID is Required']
    },
    description: {
        type: Text,
        required: [true, 'Description is Required'],
        unique: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);