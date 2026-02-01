import { motion } from "framer-motion";
import { 
  PenSquare, 
  Sparkles, 
  BarChart3, 
  Search, 
  CreditCard, 
  Shield,
  Zap,
  Users
} from "lucide-react";

const features = [
  {
    icon: PenSquare,
    title: "Markdown Editor",
    description: "Beautiful, distraction-free writing with live preview. Support for code blocks, images, and more.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description: "Get help with topic ideas, content expansion, grammar fixes, and tone adjustments powered by AI.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Automatically generate meta tags, get SEO scores, and optimize your content for search engines.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track views, likes, shares, and earnings. Understand your audience with detailed insights.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: CreditCard,
    title: "Monetization",
    description: "Offer premium content, manage subscriptions, and track your earnings—all built-in.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with HTTPS, JWT auth, and strict data privacy compliance.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with server-side rendering and global CDN delivery.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "Build your audience with built-in newsletter, comments, and social sharing features.",
    color: "from-teal-500 to-cyan-500",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            From writing to publishing to earning—we've got all the tools you need 
            to create a successful blog.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
