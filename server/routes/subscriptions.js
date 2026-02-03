const express = require('express');
const { Subscription } = require('../models/Subscription');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Subscribe to an author
router.post('/subscribe/:authorId', auth, async (req, res) => {
    try {
        const { authorId } = req.params;
        const subscriberId = req.user.userId;

        // Prevent self-subscription
        if (subscriberId === authorId) {
            return res.status(400).json({ message: 'You cannot subscribe to yourself' });
        }

        // Check if author exists
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Check if already subscribed
        const existingSubscription = await Subscription.findOne({
            subscriber: subscriberId,
            author: authorId
        });

        if (existingSubscription) {
            return res.status(400).json({ message: 'Already subscribed to this author' });
        }

        // Create subscription
        const subscription = new Subscription({
            subscriber: subscriberId,
            author: authorId
        });

        await subscription.save();

        res.status(201).json({
            message: 'Successfully subscribed',
            subscription
        });
    } catch (error) {
        console.error('Subscribe Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Unsubscribe from an author
router.post('/unsubscribe/:authorId', auth, async (req, res) => {
    try {
        const { authorId } = req.params;
        const subscriberId = req.user.userId;

        const subscription = await Subscription.findOneAndDelete({
            subscriber: subscriberId,
            author: authorId
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.json({ message: 'Successfully unsubscribed' });
    } catch (error) {
        console.error('Unsubscribe Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Check subscription status for a specific author
router.get('/status/:authorId', auth, async (req, res) => {
    try {
        const { authorId } = req.params;
        const subscriberId = req.user.userId;

        const subscription = await Subscription.findOne({
            subscriber: subscriberId,
            author: authorId
        });

        res.json({
            isSubscribed: !!subscription,
            subscription: subscription || null
        });
    } catch (error) {
        console.error('Subscription Status Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all authors the current user is subscribed to
router.get('/my-subscriptions', auth, async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ subscriber: req.user.userId })
            .populate('author', 'username email')
            .sort({ subscribedAt: -1 });

        res.json(subscriptions);
    } catch (error) {
        console.error('My Subscriptions Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all subscribers for the current user (people who subscribed to them)
router.get('/subscribers', auth, async (req, res) => {
    try {
        const subscribers = await Subscription.find({ author: req.user.userId })
            .populate('subscriber', 'username email')
            .sort({ subscribedAt: -1 });

        res.json(subscribers);
    } catch (error) {
        console.error('Subscribers Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get subscriber count for a specific author
router.get('/count/:authorId', async (req, res) => {
    try {
        const { authorId } = req.params;
        const count = await Subscription.countDocuments({ author: authorId });

        res.json({ count });
    } catch (error) {
        console.error('Subscriber Count Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
