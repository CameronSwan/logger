const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        maxLength: 20
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [7, 'Must Be At Least 7 Characters.']
    },
    phoneNumber: {
        type: Number
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role ID is Required']
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        unique: true,
        validate: {
            validator: v => {
                return /[A-Za-z0-9.-]@[A-Za-z0-9.-]+\.[a-z]/.test(v)
            },
            message: "Must be a valid email address"
        },
        maxLength: 32
    },
    verifiedBy: {
        type: Schema.Types.ObjectId
    },
    verifiedAt: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: [true, 'createdAt is Required.']
    }
});


module.exports = mongoose.model('User', userSchema);