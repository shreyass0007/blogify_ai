import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const CTASection = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-8">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Start in under 2 minutes</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Ready to Transform Your Blogging?
          </h2>

          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Join thousands of creators who are already using BlogifyAI to write better content,
            grow their audience, and earn more from their expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to={isAuthenticated ? "/editor" : "/register"}>
                {isAuthenticated ? "Start Writing" : "Start Writing Free"}
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>

          <p className="text-primary-foreground/50 text-sm mt-8">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
