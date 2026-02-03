import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Trash2, Check, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Notification {
    _id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    relatedPost?: {
        _id: string;
        title: string;
        slug?: string;
    };
    relatedAuthor?: {
        _id: string;
        username: string;
    };
}

interface NotificationsListProps {
    onNotificationRead: () => void;
    onAllRead: () => void;
}

export function NotificationsList({ onNotificationRead, onAllRead }: NotificationsListProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await notificationApi.getAll(1, 20);
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNotificationClick = async (notification: Notification) => {
        try {
            if (!notification.read) {
                await notificationApi.markAsRead(notification._id);
                setNotifications(prev =>
                    prev.map(n => n._id === notification._id ? { ...n, read: true } : n)
                );
                onNotificationRead();
            }

            if (notification.relatedPost) {
                navigate(`/blog/${notification.relatedPost._id}`);
            }
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await notificationApi.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            onAllRead();
            toast({
                title: 'All notifications marked as read',
            });
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleDelete = async (e: React.MouseEvent, notificationId: string) => {
        e.stopPropagation();
        try {
            await notificationApi.deleteNotification(notificationId);
            setNotifications(prev => prev.filter(n => n._id !== notificationId));
            toast({
                title: 'Notification deleted',
            });
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="font-semibold text-lg">Notifications</h3>
                {notifications.some(n => !n.read) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllRead}
                        className="h-8 text-xs"
                    >
                        <Check className="mr-1 h-3 w-3" />
                        Mark all read
                    </Button>
                )}
            </div>

            <Separator />

            <ScrollArea className="h-[400px]">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">No notifications yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {notifications.map((notification, index) => (
                            <div key={notification._id}>
                                <div
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`
                                        flex items-start gap-3 p-4 cursor-pointer transition-colors
                                        hover:bg-accent/50
                                        ${!notification.read ? 'bg-accent/10' : ''}
                                    `}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="font-medium text-sm">{notification.title}</p>
                                            {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-accent mt-1 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 flex-shrink-0"
                                        onClick={(e) => handleDelete(e, notification._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {index < notifications.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
