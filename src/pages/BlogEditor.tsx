import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Sparkles,
  X,
  Plus,
  Image as ImageIcon,
  Settings,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIAssistantPanel from "@/components/editor/AIAssistantPanel";
import SEOPanel from "@/components/editor/SEOPanel";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const isEditing = !!postId;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showSEOPanel, setShowSEOPanel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${postId}`);
      setTitle(data.title);
      setContent(data.content);
      setTags(data.tags || []);
    } catch (error) {
      toast({ title: "Failed to load post", variant: "destructive" });
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag.toLowerCase())) {
      setTags([...tags, newTag.toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = useCallback(async () => {
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const postData = { title, content, tags, status: 'draft' };
      if (isEditing) {
        await api.put(`/posts/${postId}`, postData);
      } else {
        const { data } = await api.post('/posts', postData);
        navigate(`/editor?id=${data._id}`, { replace: true });
      }
      toast({ title: "Draft saved!" });
    } catch (error) {
      toast({ title: "Failed to save draft", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }, [title, content, tags, isEditing, postId, toast, navigate]);

  const handlePublish = useCallback(async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const postData = { title, content, tags, status: 'published' };
      if (isEditing) {
        await api.put(`/posts/${postId}`, postData);
      } else {
        await api.post('/posts', postData);
      }
      toast({
        title: "Published! 🎉",
        description: "Your blog post is now live.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({ title: "Failed to publish", variant: "destructive" });
    } finally {
      setIsPublishing(false);
    }
  }, [title, content, tags, isEditing, postId, toast, navigate]);

  const handleAIInsert = (text: string) => {
    setContent((prev) => prev + "\n\n" + text);
    setShowAIPanel(false);
    toast({
      title: "AI content added",
      description: "The generated content has been inserted.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {title || "Untitled Post"}
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSEOPanel(!showSEOPanel)}
              >
                <Settings className="w-4 h-4 mr-2" />
                SEO
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="text-accent"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Assist
              </Button>
              <div className="h-6 w-px bg-border mx-2" />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Draft
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Editor */}
        <main className="flex-1 p-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <Input
                type="text"
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-serif font-bold border-none shadow-none px-0 h-auto py-2 placeholder:text-muted-foreground/50 focus-visible:ring-0"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <div className="flex items-center gap-1">
                <Input
                  type="text"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  className="h-7 w-24 text-sm border-dashed"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleAddTag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload a featured image
              </p>
              <p className="text-xs text-muted-foreground/60">
                PNG, JPG up to 5MB
              </p>
            </div>

            {/* Editor */}
            <div data-color-mode="light">
              {showPreview ? (
                <div className="prose max-w-none bg-card rounded-lg border p-8">
                  <MDEditor.Markdown source={content} />
                </div>
              ) : (
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  height={500}
                  preview="edit"
                  className="!border-border"
                />
              )}
            </div>
          </motion.div>
        </main>

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <AIAssistantPanel
            onClose={() => setShowAIPanel(false)}
            onInsert={handleAIInsert}
            currentContent={content}
          />
        )}

        {/* SEO Panel */}
        {showSEOPanel && (
          <SEOPanel
            onClose={() => setShowSEOPanel(false)}
            title={title}
            content={content}
          />
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
