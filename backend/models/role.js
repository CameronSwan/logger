const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema ({

    description: {
        type: Text,
        unique: true
    },
    name: {
        // enum is a set of speicific nums, role can only be User, Moderator or Admin
        type: string, enum: ['User', 'Moderator', 'Admin'],
        required: [true, 'Role name is Required']
    }
});

module.exports = mongoose.model('Role', roleSchema);