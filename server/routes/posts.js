const express = require('express');
const { Post } = require('../models/Post');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all published posts (PUBLIC - no auth required)
router.get('/public', async (req, res) => {
    try {
        const posts = await Post.find({ status: 'published' })
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Public Posts Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single published post (PUBLIC - no auth required)
router.get('/public/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, status: 'published' })
            .populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Increment views
        post.views = (post.views || 0) + 1;
        await post.save();
        res.json(post);
    } catch (error) {
        console.error('Public Post Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts for logged in user
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single post
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, author: req.user.userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create post
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, tags, status, image } = req.body;
        const post = new Post({
            title,
            content: content || '',
            tags: tags || [],
            status: status || 'draft',
            image: image || '',
            author: req.user.userId
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Create Post Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update post
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content, tags, status, image } = req.body;
        let post = await Post.findOne({ _id: req.params.id, author: req.user.userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tags || post.tags;
        post.status = status || post.status;
        post.image = image !== undefined ? image : post.image;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user.userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
