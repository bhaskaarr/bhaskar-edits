import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CtaVideoSection from "@/components/CtaVideoSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CtaVideoSection />
      <WorkSection />
      <SkillsSection />
      <StatsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
