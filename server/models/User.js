const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 6
    },
    googleId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for subscribers count
userSchema.virtual('subscribersCount', {
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'author',
    count: true
});

// Virtual for subscriptions count
userSchema.virtual('subscriptionsCount', {
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'subscriber',
    count: true
});

// Enable virtuals in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);
module.exports = { User };
