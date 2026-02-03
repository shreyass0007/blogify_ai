import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "0",
    period: "forever",
    features: [
      "3 blog posts per month",
      "Basic Markdown editor",
      "5 AI generations per month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious content creators",
    price: "1550",
    period: "/month",
    features: [
      "Unlimited blog posts",
      "Advanced Markdown editor",
      "100 AI generations per month",
      "SEO optimization tools",
      "Priority support",
      "Advanced analytics",
      "Custom domain",
      "Remove branding",
    ],
    cta: "Start Pro Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Business",
    description: "For teams and publications",
    price: "4000",
    period: "/month",
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "Team collaboration",
      "Multi-author support",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${plan.popular
                  ? "bg-primary text-primary-foreground shadow-xl scale-105"
                  : "bg-card border border-border"
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className={`font-serif text-2xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}>
                  ₹{plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-accent"
                      }`} />
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-foreground"
                      }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : plan.variant}
                size="lg"
                className="w-full"
                asChild
              >
                <Link to="/register">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          💰 30-day money-back guarantee • No credit card required for free plan
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
