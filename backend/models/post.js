const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema ({

    title: {
        type: String,
        required: [true, 'Post title is Required'],
        maxLength: 32
    },
    description: {
        type: String,
        unique: true,
        maxLength: 512
    }
});

module.exports = mongoose.model('Post', postSchema);