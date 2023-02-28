const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema ({

    description: {
        type: Text
    },
    name: {
        unique: true,
        // enum is a set of speicific nums, role can only be User, Moderator or Admin
        type: string, enum: ['User', 'Moderator', 'Admin']
    }
});

module.exports = mongoose.model('Role', roleSchema);