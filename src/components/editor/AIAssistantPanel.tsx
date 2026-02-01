import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  X,
  Sparkles,
  Lightbulb,
  Type,
  Expand,
  CheckCircle2,
  Hash,
  FileText,
  Wand2,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantPanelProps {
  onClose: () => void;
  onInsert: (text: string) => void;
  currentContent: string;
}

const aiTools = [
  { id: "ideas", icon: Lightbulb, label: "Topic Ideas", description: "Generate blog topic suggestions" },
  { id: "title", icon: Type, label: "Title Generator", description: "Create catchy headlines" },
  { id: "expand", icon: Expand, label: "Expand Content", description: "Elaborate on your ideas" },
  { id: "grammar", icon: CheckCircle2, label: "Fix Grammar", description: "Polish your writing" },
  { id: "keywords", icon: Hash, label: "SEO Keywords", description: "Find ranking keywords" },
  { id: "summarize", icon: FileText, label: "Summarize", description: "Create brief summaries" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "persuasive", label: "Persuasive" },
  { value: "informative", label: "Informative" },
];

const AIAssistantPanel = ({ onClose, onInsert, currentContent }: AIAssistantPanelProps) => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTool) {
      toast({
        title: "Select a tool",
        description: "Please choose an AI tool first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResponses: Record<string, string> = {
      ideas: `Here are some blog topic ideas based on your content:\n\n1. **The Future of Remote Work: Trends to Watch in 2024**\n2. **How AI is Transforming Content Creation**\n3. **Building a Personal Brand: From Zero to Expert**\n4. **The Ultimate Guide to Productivity for Writers**\n5. **Monetizing Your Expertise: Beyond Traditional Methods**`,
      title: `Here are some title suggestions:\n\n1. "The Complete Guide to [Topic]: Everything You Need to Know"\n2. "Why [Topic] Is the Future of [Industry]"\n3. "10 Proven Strategies for [Desired Outcome]"\n4. "How I [Achievement] in [Timeframe]: A Step-by-Step Guide"\n5. "The Truth About [Topic] That Nobody Talks About"`,
      expand: `Based on your content, here's an expanded section:\n\nContent creation has evolved dramatically in recent years, with AI-powered tools becoming indispensable for modern writers. These technologies don't replace human creativity—they enhance it. By handling routine tasks like grammar checking, keyword research, and content optimization, AI frees writers to focus on what they do best: crafting compelling narratives that resonate with readers.\n\nThe key is finding the right balance between human insight and machine efficiency. The most successful content creators leverage AI as a collaborative partner, using it to overcome writer's block, generate ideas, and polish their prose.`,
      grammar: `Here are the grammar improvements for your text:\n\n✅ Fixed subject-verb agreements\n✅ Corrected punctuation errors\n✅ Improved sentence structure\n✅ Enhanced readability\n\nYour content is now polished and ready for publication!`,
      keywords: `Recommended SEO keywords for your content:\n\n**Primary Keywords:**\n- AI writing assistant\n- Content creation tools\n- Blog optimization\n\n**Long-tail Keywords:**\n- How to use AI for blogging\n- Best AI writing tools 2024\n- Improve blog SEO with AI\n\n**Related Terms:**\n- Content marketing\n- Digital publishing\n- Writer productivity`,
      summarize: `**Summary:**\n\nThis article explores the intersection of AI technology and content creation, highlighting how modern tools can enhance rather than replace human creativity. Key takeaways include the importance of balancing automation with authentic voice, leveraging AI for routine tasks, and maintaining focus on quality storytelling.`,
    };

    setGeneratedContent(mockResponses[selectedTool] || "Generated content will appear here.");
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-96 border-l bg-card h-[calc(100vh-4rem)] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-card border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-semibold">AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Tool Selection */}
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Choose a Tool
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {aiTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedTool === tool.id
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <tool.icon className={`w-5 h-5 mb-2 ${
                  selectedTool === tool.id ? "text-accent" : "text-muted-foreground"
                }`} />
                <p className="font-medium text-sm">{tool.label}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <Label htmlFor="tone" className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Writing Tone
          </Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Prompt */}
        <div>
          <Label htmlFor="prompt" className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Additional Instructions (Optional)
          </Label>
          <Textarea
            id="prompt"
            placeholder="Add any specific requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <Button
          variant="accent"
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating || !selectedTool}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {/* Generated Content */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Generated Content
              </Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="w-4 h-4 mr-1" />
                  ) : (
                    <Copy className="w-4 h-4 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-sm whitespace-pre-wrap">
              {generatedContent}
            </div>
            <Button
              variant="default"
              className="w-full"
              onClick={() => onInsert(generatedContent)}
            >
              Insert into Editor
            </Button>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default AIAssistantPanel;
