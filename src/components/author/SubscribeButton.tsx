import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { subscriptionApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface SubscribeButtonProps {
    authorId: string;
    authorName: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SubscribeButton({ authorId, authorName, variant = 'default', size = 'default' }: SubscribeButtonProps) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const { toast } = useToast();

    // Check subscription status on mount
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsCheckingStatus(false);
                    return;
                }

                const response = await subscriptionApi.getStatus(authorId);
                setIsSubscribed(response.data.isSubscribed);
            } catch (error) {
                console.error('Error checking subscription status:', error);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkStatus();
    }, [authorId]);

    const handleSubscribe = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Authentication required',
                description: 'Please log in to subscribe to authors',
                variant: 'destructive'
            });
            return;
        }

        setIsLoading(true);
        try {
            if (isSubscribed) {
                await subscriptionApi.unsubscribe(authorId);
                setIsSubscribed(false);
                toast({
                    title: 'Unsubscribed',
                    description: `You will no longer receive notifications from ${authorName}`,
                });
            } else {
                await subscriptionApi.subscribe(authorId);
                setIsSubscribed(true);
                toast({
                    title: 'Subscribed!',
                    description: `You'll be notified when ${authorName} publishes new posts`,
                });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update subscription';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingStatus) {
        return (
            <Button variant={variant} size={size} disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
        );
    }

    return (
        <Button
            variant={isSubscribed ? 'outline' : variant}
            size={size}
            onClick={handleSubscribe}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSubscribed ? 'Unsubscribing...' : 'Subscribing...'}
                </>
            ) : (
                <>
                    {isSubscribed ? (
                        <>
                            <BellOff className="mr-2 h-4 w-4" />
                            Unsubscribe
                        </>
                    ) : (
                        <>
                            <Bell className="mr-2 h-4 w-4" />
                            Subscribe
                        </>
                    )}
                </>
            )}
        </Button>
    );
}
