const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const phoneNumberValidator = {
    validator: function(v) {
        return /^\d{10}$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number! Must have exactly 10 digits.`
};
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        // required: true,
        validate: phoneNumberValidator // Apply custom validator
    },
    // warehouseAddress: {
    //     // brand
    //     // id from warehouse table
    //     street: {
    //     type: String,
    //     //   required: true
    //     },
    //     city: {
    //     type: String,
    //     //   required: true
    //     },
    //     state: {
    //     type: String,
    //     //   required: true
    //     },
    //     postalCode: {
    //     type: String,
    //     //   required: true
    //     },
    //     country: {
    //     type: String,
    //     default: "India"
    //     //   required: true
    //     }
    // },

    role: {
        type: String,
        enum: ['Warehouse Manager', 'Order Fulfillment Specialist', 'Receiving Clerk', 'Returns Clerk'],
        required: [true,'A user must have a role']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false   // to never show password in any output
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
            return el === this.password;
        },
        message: "Confirmed password doesn't match with password provided earlier"
        }
    },
    passwordChangedAt: Date,
   

    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    }
    });

    userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
    });

    userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
    });

    userSchema.pre(/^find/, function(next) { // ^find for every query that starts with find
    // Query Middleware: this points to the current query -> if current user is inactive -> dont find it
    this.find({ active: { $ne: false } });
    next();
    });

    userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
    ) {
    return await bcrypt.compare(candidatePassword, userPassword);
    };

    const User = mongoose.model('User', userSchema);

    module.exports = User;
