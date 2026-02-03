import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Heart, Calendar, User, Loader2 } from "lucide-react";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: { username: string } | string;
    createdAt: string;
    views: number;
    likes: number;
    tags: string[];
    image?: string;
}

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/posts/public/${id}`);
                setPost(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load post');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPost();
    }, [id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getReadTime = (content: string) => {
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    const getAuthorName = (author: Post['author']) => {
        if (typeof author === 'string') return 'Unknown';
        return author?.username || 'Unknown';
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-accent" />
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
                    <p className="text-muted-foreground mb-6">{error || 'The article you are looking for does not exist.'}</p>
                    <Button variant="accent" asChild>
                        <Link to="/blog">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero / Header */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-subtle py-16"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Back Button */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to all articles
                        </Link>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-accent" />
                                </div>
                                <span className="font-medium text-foreground">{getAuthorName(post.author)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{getReadTime(post.content)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-xl aspect-video relative">
                            <img
                                src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Content */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-12"
            >
                <div className="container mx-auto px-4">
                    <article className="max-w-3xl mx-auto">
                        {/* Article Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-em:text-foreground/80 prose-a:text-accent">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        {/* Stats & Engagement */}
                        <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Eye className="w-5 h-5" />
                                <span>{formatNumber(post.views || 0)} views</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="w-5 h-5" />
                                <span>{formatNumber(post.likes || 0)} likes</span>
                            </div>
                        </div>

                        {/* Share / CTA */}
                        <div className="mt-12 p-8 bg-secondary/50 rounded-2xl text-center">
                            <h3 className="text-xl font-serif font-bold mb-2">Enjoyed this article?</h3>
                            <p className="text-muted-foreground mb-6">Start writing your own stories with AI-powered tools.</p>
                            <Button variant="accent" size="lg" asChild>
                                <Link to="/register">Start Writing for Free</Link>
                            </Button>
                        </div>
                    </article>
                </div>
            </motion.section>
        </Layout>
    );
};

export default BlogPost;
