import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                login(token, user);
                toast({
                    title: "Login Successful!",
                    description: `Welcome back, ${user.username}!`,
                });
                navigate('/dashboard');
            } catch (error) {
                console.error("Failed to parse user data", error);
                toast({ title: "Login Failed", variant: "destructive" });
                navigate('/login');
            }
        } else if (token) {
            // Fallback if no user data (shouldn't happen with updated backend)
            navigate('/login');
        } else {
            // No token found, redirect to login
            toast({ title: "Login Failed", description: "No authentication token found.", variant: "destructive" });
            navigate('/login');
        }
    }, [searchParams, login, navigate, toast]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
};
export default AuthCallback;
