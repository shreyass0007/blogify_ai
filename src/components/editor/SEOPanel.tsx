import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { X, Sparkles, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface SEOPanelProps {
  onClose: () => void;
  title: string;
  content: string;
}

const SEOPanel = ({ onClose, title, content }: SEOPanelProps) => {
  const [metaTitle, setMetaTitle] = useState(title);
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [seoScore, setSeoScore] = useState(0);
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [checks, setChecks] = useState<
    Array<{ id: string; label: string; passed: boolean; suggestion?: string }>
  >([]);

  useEffect(() => {
    analyzeContent();
  }, [title, content, focusKeyword]);

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const wordCount = content.split(/\s+/).length;
    const hasTitle = title.length > 10;
    const titleLength = title.length;
    const hasKeywordInTitle = focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase());
    const hasKeywordInContent = focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase());
    const keywordDensity = focusKeyword
      ? ((content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / wordCount) * 100
      : 0;
    const hasImages = content.includes("![");
    const hasLinks = content.includes("](");
    const hasHeadings = content.includes("##");

    const newChecks = [
      {
        id: "title-length",
        label: "Title length",
        passed: titleLength >= 30 && titleLength <= 60,
        suggestion: titleLength < 30 ? "Title is too short" : titleLength > 60 ? "Title is too long" : undefined,
      },
      {
        id: "meta-description",
        label: "Meta description",
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
        suggestion: !metaDescription ? "Add a meta description" : metaDescription.length < 120 ? "Description is too short" : undefined,
      },
      {
        id: "focus-keyword",
        label: "Focus keyword in title",
        passed: !!hasKeywordInTitle,
        suggestion: focusKeyword && !hasKeywordInTitle ? "Add your keyword to the title" : undefined,
      },
      {
        id: "keyword-content",
        label: "Keyword in content",
        passed: !!hasKeywordInContent,
        suggestion: focusKeyword && !hasKeywordInContent ? "Use your focus keyword in the content" : undefined,
      },
      {
        id: "keyword-density",
        label: "Keyword density",
        passed: keywordDensity >= 1 && keywordDensity <= 3,
        suggestion: keywordDensity < 1 ? "Use the keyword more often" : keywordDensity > 3 ? "Reduce keyword usage" : undefined,
      },
      {
        id: "content-length",
        label: "Content length",
        passed: wordCount >= 300,
        suggestion: wordCount < 300 ? `Add ${300 - wordCount} more words` : undefined,
      },
      {
        id: "headings",
        label: "Subheadings",
        passed: hasHeadings,
        suggestion: !hasHeadings ? "Add subheadings (H2, H3) to structure content" : undefined,
      },
      {
        id: "images",
        label: "Images",
        passed: hasImages,
        suggestion: !hasImages ? "Add images to enhance engagement" : undefined,
      },
      {
        id: "internal-links",
        label: "Links",
        passed: hasLinks,
        suggestion: !hasLinks ? "Add internal or external links" : undefined,
      },
    ];

    setChecks(newChecks);

    const passedChecks = newChecks.filter((c) => c.passed).length;
    setSeoScore(Math.round((passedChecks / newChecks.length) * 100));

    // Simple readability calculation
    const avgSentenceLength = content.split(/[.!?]+/).filter(Boolean).length;
    const readability = Math.min(100, Math.max(0, 100 - Math.abs(15 - avgSentenceLength) * 5));
    setReadabilityScore(readability);

    setIsAnalyzing(false);
  };

  const generateMetaDescription = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock AI-generated description
    const generated = `Discover the essential strategies for ${focusKeyword || "success"} in this comprehensive guide. Learn actionable tips and expert insights to achieve your goals.`;
    setMetaDescription(generated.slice(0, 155));
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
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
          <span className="font-semibold">SEO Analysis</span>
          {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <p className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>{seoScore}</p>
            <p className="text-xs text-muted-foreground mt-1">SEO Score</p>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(seoScore)} transition-all duration-500`}
                style={{ width: `${seoScore}%` }}
              />
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <p className={`text-3xl font-bold ${getScoreColor(readabilityScore)}`}>{readabilityScore}</p>
            <p className="text-xs text-muted-foreground mt-1">Readability</p>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(readabilityScore)} transition-all duration-500`}
                style={{ width: `${readabilityScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Focus Keyword */}
        <div>
          <Label htmlFor="keyword" className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Focus Keyword
          </Label>
          <Input
            id="keyword"
            placeholder="e.g., content marketing"
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
          />
        </div>

        {/* Meta Title */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <Label htmlFor="metaTitle" className="text-xs uppercase tracking-wider text-muted-foreground">
              Meta Title
            </Label>
            <span className={`text-xs ${metaTitle.length > 60 ? "text-red-500" : "text-muted-foreground"}`}>
              {metaTitle.length}/60
            </span>
          </div>
          <Input
            id="metaTitle"
            placeholder="SEO-friendly page title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            maxLength={70}
          />
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <Label htmlFor="metaDesc" className="text-xs uppercase tracking-wider text-muted-foreground">
              Meta Description
            </Label>
            <span className={`text-xs ${metaDescription.length > 160 ? "text-red-500" : "text-muted-foreground"}`}>
              {metaDescription.length}/160
            </span>
          </div>
          <Textarea
            id="metaDesc"
            placeholder="Brief description for search results"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            maxLength={170}
          />
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={generateMetaDescription}
            disabled={isAnalyzing}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
        </div>

        {/* SEO Checklist */}
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            SEO Checklist
          </Label>
          <div className="space-y-2">
            {checks.map((check) => (
              <div
                key={check.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  check.passed ? "bg-green-500/10" : "bg-muted"
                }`}
              >
                {check.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <div>
                  <p className={`text-sm font-medium ${check.passed ? "text-green-700" : "text-foreground"}`}>
                    {check.label}
                  </p>
                  {check.suggestion && (
                    <p className="text-xs text-muted-foreground mt-0.5">{check.suggestion}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SEOPanel;
