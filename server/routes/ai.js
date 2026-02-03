const express = require('express');
const { openai } = require('../services/openai');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Generate blog topic ideas
router.post('/ideas', async (req, res) => {
    try {
        const { topic, tone = 'professional' } = req.body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a creative blog content strategist. Generate engaging blog topic ideas in a ${tone} tone.`
                },
                {
                    role: 'user',
                    content: topic
                        ? `Generate 5 unique and engaging blog topic ideas related to: "${topic}"`
                        : 'Generate 5 unique and engaging blog topic ideas for a general audience'
                }
            ],
            max_tokens: 500,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Ideas Error:', error);
        res.status(500).json({ message: 'Failed to generate ideas', error: error.message });
    }
});

// Generate title variations
router.post('/title', async (req, res) => {
    try {
        const { topic, tone = 'professional' } = req.body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert headline writer. Create catchy, SEO-friendly blog titles in a ${tone} tone.`
                },
                {
                    role: 'user',
                    content: `Generate 5 compelling blog title variations for the topic: "${topic || 'general blog post'}"`
                }
            ],
            max_tokens: 300,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Title Error:', error);
        res.status(500).json({ message: 'Failed to generate titles', error: error.message });
    }
});

// Expand content
router.post('/expand', async (req, res) => {
    try {
        const { content, tone = 'professional' } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a skilled content writer. Expand and elaborate on the given content while maintaining a ${tone} tone. Add more detail, examples, and depth.`
                },
                {
                    role: 'user',
                    content: `Expand and elaborate on the following content:\n\n"${content}"`
                }
            ],
            max_tokens: 800,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Expand Error:', error);
        res.status(500).json({ message: 'Failed to expand content', error: error.message });
    }
});

// Fix grammar and polish text
router.post('/grammar', async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional editor. Fix grammar, spelling, punctuation, and improve sentence structure while preserving the original meaning and voice.'
                },
                {
                    role: 'user',
                    content: `Please fix the grammar and polish the following text:\n\n"${content}"`
                }
            ],
            max_tokens: 800,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Grammar Error:', error);
        res.status(500).json({ message: 'Failed to fix grammar', error: error.message });
    }
});

// Generate SEO keywords
router.post('/keywords', async (req, res) => {
    try {
        const { content, topic } = req.body;

        const inputText = content || topic || '';
        if (!inputText) {
            return res.status(400).json({ message: 'Content or topic is required' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO expert. Generate relevant keywords and phrases that will help the content rank well in search engines.'
                },
                {
                    role: 'user',
                    content: `Generate SEO keywords for the following content. Include primary keywords, long-tail keywords, and related terms:\n\n"${inputText}"`
                }
            ],
            max_tokens: 400,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Keywords Error:', error);
        res.status(500).json({ message: 'Failed to generate keywords', error: error.message });
    }
});

// Summarize content
router.post('/summarize', async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are a skilled summarizer. Create concise, clear summaries that capture the key points and main ideas.'
                },
                {
                    role: 'user',
                    content: `Summarize the following content in a clear and concise manner:\n\n"${content}"`
                }
            ],
            max_tokens: 300,
        });

        res.json({ content: completion.choices[0].message.content });
    } catch (error) {
        console.error('AI Summarize Error:', error);
        res.status(500).json({ message: 'Failed to summarize', error: error.message });
    }
});

module.exports = router;
