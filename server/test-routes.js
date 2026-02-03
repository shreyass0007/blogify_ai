// Quick test to see if routes can be required
try {
    const subscriptionRoutes = require('./routes/subscriptions');
    const notificationRoutes = require('./routes/notifications');
    console.log('✓ Subscription routes loaded:', typeof subscriptionRoutes);
    console.log('✓ Notification routes loaded:', typeof notificationRoutes);
} catch (error) {
    console.error('✗ Error loading routes:', error.message);
    console.error(error.stack);
}
