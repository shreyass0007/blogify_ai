import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Clock, Eye, Heart, ArrowRight, Crown, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: { username: string } | string;
  createdAt: string;
  views: number;
  likes: number;
  tags: string[];
  status: string;
  image?: string;
}

const gradientColors = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-cyan-500",
];

const popularTags = ["All", "AI", "Tech", "Marketing", "Growth", "Productivity", "Business"];

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts/public');
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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

  const getAuthorInitial = (author: Post['author']) => {
    const name = getAuthorName(author);
    return name.charAt(0).toUpperCase();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Explore Ideas
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover articles on writing, marketing, AI, and growing your audience.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found.</p>
              <p className="text-sm text-muted-foreground mt-2">Be the first to publish!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover */}
                  <div className={`h-48 relative overflow-hidden ${!post.image && gradientColors[index % gradientColors.length]}`}>
                    {post.image ? (
                      <img
                        src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      <Link to={`/blog/${post._id}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.content.slice(0, 150)}...
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                          {getAuthorInitial(post.author)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{getAuthorName(post.author)}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadTime(post.content)}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(post.views || 0)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(post.likes || 0)}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to Share Your Ideas?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start writing today with AI-powered tools and reach thousands of readers.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/editor">
              Start Writing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
