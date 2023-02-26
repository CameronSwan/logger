const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema ({

    postId: {
        type: Number,
        required: [true, 'Post ID is Required']
    },
    title: {
        type: String,
        required: [true, 'Post Name is Required']
    },
    description: {
        type: Text,
        unique: true
    }
});

module.exports = mongoose.model('Post', postSchema);