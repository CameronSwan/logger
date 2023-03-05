const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema ({

    title: {
        type: String,
        required: [true, 'Post title is Required']
    },
    description: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Post', postSchema);