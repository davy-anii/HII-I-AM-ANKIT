import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CVSection from "@/components/sections/CVSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import TargetCursor from "@/components/ui/TargetCursor";

export default function Home() {
  return (
    <main className="flex flex-col w-full relative z-10">
      <TargetCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CVSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
