const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema ({

    description: {
        type: String,
        maxLength: 512
    },
    name: {
        // enum is used any time you need to represent a fixed set of constants
        // role can only be User, Moderator or Admin
        type: String, enum: ['User', 'Moderator', 'Admin'],
        default: 'User'
    }
});

module.exports = mongoose.model('Role', roleSchema);