import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CtaVideoSection from "@/components/CtaVideoSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import StatsSection from "@/components/StatsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Marquee />
      <HeroSection />
      <ServicesSection />
      <CtaVideoSection />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <SkillsSection />
      <StatsSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Index;
