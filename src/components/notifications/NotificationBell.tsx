import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { NotificationsList } from '@/components/notifications/NotificationsList';
import { notificationApi } from '@/lib/api';

export function NotificationBell() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await notificationApi.getUnreadCount();
                setUnreadCount(response.data.count);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();

        // Poll for updates every 30 seconds
        const interval = setInterval(fetchUnreadCount, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleNotificationRead = () => {
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const handleAllRead = () => {
        setUnreadCount(0);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="end">
                <NotificationsList
                    onNotificationRead={handleNotificationRead}
                    onAllRead={handleAllRead}
                />
            </PopoverContent>
        </Popover>
    );
}
