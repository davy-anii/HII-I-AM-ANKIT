import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CVSection from "@/components/sections/CVSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import GithubStatsSection from "@/components/sections/GithubStatsSection";
import Footer from "@/components/layout/Footer";
import TargetCursor from "@/components/ui/TargetCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LenisProvider from "@/components/ui/LenisProvider";
import ChatbotWindow from "@/components/ui/ChatbotWindow";
import AiChatSection from "@/components/sections/AiChatSection";

export default function Home() {
  return (
    <LenisProvider>
      <main className="flex flex-col w-full relative z-10">
        <LoadingScreen />
        <TargetCursor />
        <ChatbotWindow />
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <GithubStatsSection />
        <TechStackSection />
        <AboutSection />
        <ExperienceSection />
        <AchievementsSection />
        <CVSection />
        <ContactSection />
        <Footer />
      </main>
    </LenisProvider>
  );
}
