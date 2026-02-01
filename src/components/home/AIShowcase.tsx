import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Type, 
  Expand, 
  CheckCircle2, 
  Hash, 
  FileText,
  Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";

const aiFeatures = [
  {
    icon: Lightbulb,
    title: "Topic Ideas",
    description: "Get trending topic suggestions based on your niche",
  },
  {
    icon: Type,
    title: "Title Generator",
    description: "Create click-worthy headlines that drive traffic",
  },
  {
    icon: Expand,
    title: "Content Expansion",
    description: "Turn brief notes into full paragraphs",
  },
  {
    icon: CheckCircle2,
    title: "Grammar Fixer",
    description: "Polish your writing with AI-powered corrections",
  },
  {
    icon: Hash,
    title: "SEO Keywords",
    description: "Discover high-impact keywords for your content",
  },
  {
    icon: FileText,
    title: "Summarization",
    description: "Create compelling meta descriptions automatically",
  },
];

const AIShowcase = () => {
  return (
    <section id="ai" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Your AI Writing Partner
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our AI assistant helps you overcome writer's block, optimize your content, 
              and create engaging posts in a fraction of the time. Simply describe what you 
              need, and let AI do the heavy lifting.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="accent" size="lg" asChild>
              <Link to="/register">Try AI Assistant Free</Link>
            </Button>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Chat-like interface mockup */}
            <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">AI Assistant</h4>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 bg-secondary/20">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Help me write an intro for an article about productivity tips</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      Here's a compelling intro for your productivity article:
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      "In a world of endless distractions, mastering productivity isn't just 
                      about doing more—it's about doing what matters. These science-backed 
                      strategies will help you reclaim your focus and achieve your goals..."
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">Use this</span>
                      <span className="px-2 py-1 text-xs bg-secondary text-muted-foreground rounded-full">Regenerate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Ask AI anything..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    disabled
                  />
                  <Button size="sm" variant="accent">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-accent/10 via-transparent to-accent/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
