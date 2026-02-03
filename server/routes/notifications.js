const express = require('express');
const { Notification } = require('../models/Notification');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all notifications for the current user
router.get('/', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const notifications = await Notification.find({ recipient: req.user.userId })
            .populate('relatedAuthor', 'username')
            .populate('relatedPost', 'title slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Notification.countDocuments({ recipient: req.user.userId });

        res.json({
            notifications,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get Notifications Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get unread notification count
router.get('/unread-count', auth, async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            recipient: req.user.userId,
            read: false
        });

        res.json({ count });
    } catch (error) {
        console.error('Unread Count Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark a notification as read
router.patch('/:id/read', auth, async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                recipient: req.user.userId
            },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json(notification);
    } catch (error) {
        console.error('Mark Read Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark all notifications as read
router.patch('/mark-all-read', auth, async (req, res) => {
    try {
        const result = await Notification.updateMany(
            {
                recipient: req.user.userId,
                read: false
            },
            { read: true }
        );

        res.json({
            message: 'All notifications marked as read',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Mark All Read Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a notification
router.delete('/:id', auth, async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            recipient: req.user.userId
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted' });
    } catch (error) {
        console.error('Delete Notification Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete all read notifications
router.delete('/clear-read', auth, async (req, res) => {
    try {
        const result = await Notification.deleteMany({
            recipient: req.user.userId,
            read: true
        });

        res.json({
            message: 'Read notifications cleared',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Clear Read Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
