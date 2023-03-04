const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema ({

    description: {
        type: Text
    },
    name: {
        // enum is used any time you need to represent a fixed set of constants
        // role can only be User, Moderator or Admin
        type: string, enum: ['User', 'Moderator', 'Admin'],
        default: 'User'
    }
});

module.exports = mongoose.model('Role', roleSchema);