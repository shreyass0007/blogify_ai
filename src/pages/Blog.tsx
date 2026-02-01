import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Clock, Eye, Heart, ArrowRight, Crown } from "lucide-react";

const mockPosts = [
  {
    id: "1",
    title: "The Complete Guide to AI-Powered Content Creation",
    excerpt: "Discover how AI tools are transforming the way we write, edit, and publish content in the digital age.",
    author: "Sarah Chen",
    authorAvatar: "S",
    date: "Jan 24, 2026",
    readTime: "8 min read",
    views: 12500,
    likes: 342,
    tags: ["AI", "Content", "Writing"],
    isPremium: true,
    coverColor: "from-purple-500 to-pink-500",
  },
  {
    id: "2",
    title: "SEO Best Practices for 2026: What Actually Works",
    excerpt: "Forget outdated tactics. Here's what Google actually rewards in 2026 and how to rank higher.",
    author: "Mike Johnson",
    authorAvatar: "M",
    date: "Jan 22, 2026",
    readTime: "12 min read",
    views: 8900,
    likes: 256,
    tags: ["SEO", "Marketing", "Growth"],
    isPremium: false,
    coverColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    title: "Building a Successful Newsletter: From 0 to 50K Subscribers",
    excerpt: "A step-by-step breakdown of how I grew my newsletter to 50,000 subscribers in just 18 months.",
    author: "Emma Davis",
    authorAvatar: "E",
    date: "Jan 20, 2026",
    readTime: "15 min read",
    views: 15200,
    likes: 489,
    tags: ["Newsletter", "Growth", "Email"],
    isPremium: true,
    coverColor: "from-orange-500 to-red-500",
  },
  {
    id: "4",
    title: "Monetizing Your Blog: 7 Revenue Streams That Work",
    excerpt: "Turn your passion project into a profitable business with these proven monetization strategies.",
    author: "Alex Rivera",
    authorAvatar: "A",
    date: "Jan 18, 2026",
    readTime: "10 min read",
    views: 7300,
    likes: 198,
    tags: ["Monetization", "Business", "Strategy"],
    isPremium: false,
    coverColor: "from-green-500 to-emerald-500",
  },
  {
    id: "5",
    title: "The Psychology of Viral Content: What Makes People Share",
    excerpt: "Understanding the emotional triggers that make content irresistible to share on social media.",
    author: "Lisa Park",
    authorAvatar: "L",
    date: "Jan 15, 2026",
    readTime: "7 min read",
    views: 21000,
    likes: 612,
    tags: ["Psychology", "Viral", "Social Media"],
    isPremium: false,
    coverColor: "from-indigo-500 to-purple-500",
  },
  {
    id: "6",
    title: "Remote Work and Productivity: Finding Your Flow",
    excerpt: "Practical tips for staying productive, creative, and mentally healthy while working from home.",
    author: "Tom Wilson",
    authorAvatar: "T",
    date: "Jan 12, 2026",
    readTime: "9 min read",
    views: 5600,
    likes: 145,
    tags: ["Productivity", "Remote Work", "Lifestyle"],
    isPremium: false,
    coverColor: "from-teal-500 to-cyan-500",
  },
];

const popularTags = ["All", "AI", "SEO", "Marketing", "Growth", "Productivity", "Business"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cover */}
                <div className={`h-48 bg-gradient-to-br ${post.coverColor} relative`}>
                  {post.isPremium && (
                    <div className="absolute top-4 right-4">
                      <span className="badge-premium">
                        <Crown className="w-3 h-3" />
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {post.authorAvatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-muted-foreground text-xs">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {formatNumber(post.likes)}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

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
