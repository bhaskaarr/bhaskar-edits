import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import CtaVideoSection from "@/components/CtaVideoSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Marquee />
      <HeroSection />
      <CtaVideoSection />
      <WorkSection />
      <SkillsSection />
      <StatsSection />
      <ContactSection />
      <ReviewsSection />
    </div>
  );
};

export default Index;
