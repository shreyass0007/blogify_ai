const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index to prevent duplicate subscriptions
subscriptionSchema.index({ subscriber: 1, author: 1 }, { unique: true });

// Prevent self-subscription
subscriptionSchema.pre('save', function (next) {
    // Convert to string for comparison to handle both ObjectId and string types
    if (this.subscriber.toString() === this.author.toString()) {
        next(new Error('Users cannot subscribe to themselves'));
    } else {
        next();
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = { Subscription };
