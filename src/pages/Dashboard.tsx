import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Plus,
  Eye,
  Heart,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockStats = [
  { label: "Total Views", value: "0", change: "+0%", icon: Eye },
  { label: "Followers", value: "0", change: "+0%", icon: Users },
  { label: "Likes", value: "0", change: "+0%", icon: Heart },
  { label: "Earnings", value: "$0", change: "+0%", icon: DollarSign },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: FileText, label: "Posts" },
  { icon: BarChart3, label: "Analytics" },
  { icon: CreditCard, label: "Earnings" },
  { icon: Settings, label: "Settings" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await api.delete(`/posts/${postId}`);
      fetchPosts();
      toast({ title: "Post deleted" });
    } catch (error) {
      toast({ title: "Failed to delete post", variant: "destructive" });
    }
  };
  return (
    <Layout showFooter={false}>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card hidden md:block">
          <div className="p-6">
            <Button variant="accent" className="w-full" asChild>
              <Link to="/editor">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
          <nav className="px-3">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${item.active
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your blog.</p>
              </div>
              <Button variant="accent" className="md:hidden" asChild>
                <Link to="/editor">
                  <Plus className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Drafts */}
              <div className="bg-card rounded-xl border">
                <div className="p-5 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Recent Drafts</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/drafts">View All</Link>
                  </Button>
                </div>
                <div className="divide-y">
                  {posts.filter((p: any) => p.status === 'draft').length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No drafts found.</div>
                  )}
                  {posts.filter((p: any) => p.status === 'draft').map((draft: any) => (
                    <div key={draft._id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{draft.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(draft.updatedAt).toLocaleDateString()}
                            </span>
                            <span>{draft.content.length} chars</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/editor?id=${draft._id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(draft._id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Published Posts */}
              <div className="bg-card rounded-xl border">
                <div className="p-5 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Published Posts</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/posts">View All</Link>
                  </Button>
                </div>
                <div className="divide-y">
                  {posts.filter((p: any) => p.status === 'published').length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No published posts found.</div>
                  )}
                  {posts.filter((p: any) => p.status === 'published').map((post: any) => (
                    <div key={post._id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{post.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/editor?id=${post._id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post._id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-accent rounded-xl p-6 text-accent-foreground">
              <h3 className="font-semibold text-lg mb-2">💡 Pro Tip</h3>
              <p className="text-accent-foreground/80">
                Posts with images get 94% more views. Try adding a compelling featured image
                to your next article to boost engagement!
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
