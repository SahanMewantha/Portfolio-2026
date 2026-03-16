import HeroScroller from "./components/Herosection";
import Header from "./components/Header";
import PortfolioSection from "./components/portfolio";
import AboutSection from "./components/about";
import SkillsSection from "./components/skill";
import TestimonialsSection from "./components/testimonials";
import ContactSection from "./components/contact";
import Footer from "./components/footer";
import ScrollProgressButton from "./components/ScrollProgressButton";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-text font-inter selection:bg-primary selection:text-background">
      {/* Floating Left Sidebar Navigation */}
      <Header />
      
      <main>
        {/* The Hero Scroller needs its own section for the 'Home' scroll anchor */}
        <section id="home">
          <HeroScroller/>
        </section>

        <PortfolioSection />
        <SkillsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Scroll Progress Button - Bottom Right */}
      <ScrollProgressButton />
    </div>
  );
}
