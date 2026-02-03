import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Subscription API
export const subscriptionApi = {
    subscribe: (authorId: string) => api.post(`/subscriptions/subscribe/${authorId}`),
    unsubscribe: (authorId: string) => api.post(`/subscriptions/unsubscribe/${authorId}`),
    getStatus: (authorId: string) => api.get(`/subscriptions/status/${authorId}`),
    getMySubscriptions: () => api.get('/subscriptions/my-subscriptions'),
    getSubscribers: () => api.get('/subscriptions/subscribers'),
    getCount: (authorId: string) => api.get(`/subscriptions/count/${authorId}`)
};

// Notification API
export const notificationApi = {
    getAll: (page = 1, limit = 20) => api.get(`/notifications?page=${page}&limit=${limit}`),
    getUnreadCount: () => api.get('/notifications/unread-count'),
    markAsRead: (notificationId: string) => api.patch(`/notifications/${notificationId}/read`),
    markAllAsRead: () => api.patch('/notifications/mark-all-read'),
    deleteNotification: (notificationId: string) => api.delete(`/notifications/${notificationId}`),
    clearRead: () => api.delete('/notifications/clear-read')
};

export default api;

