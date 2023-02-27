const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        min: [5,'Must be at least 5'],
        max: 20
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [7,'Must be at least 7'],
        max: 20
    },
    phoneNumber: {
        type: Number
    },
    roleId: {
        type: Number,
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
        }
    },
    verifiedBy: {
        type: Number
    },
    verifiedAt: {
        type: Date
    },
    createdBy: {
        type: Number
    },
    createdAt: {
        type: Date,
        required: [true, 'createdAt is Required.']
    }
});


module.exports = mongoose.model('User', userSchema);