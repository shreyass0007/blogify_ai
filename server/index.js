const dotenv = require('dotenv');
dotenv.config(); // Load env vars FIRST before other imports that depend on them

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const aiRoutes = require('./routes/ai');
const uploadRoutes = require('./routes/upload');
const subscriptionRoutes = require('./routes/subscriptions');
const notificationRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const session = require('express-session');

app.use(session({
    secret: process.env.JWT_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false,
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

