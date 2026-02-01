import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AIShowcase from "@/components/home/AIShowcase";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <AIShowcase />
      <PricingSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
