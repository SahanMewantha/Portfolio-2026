import dynamic from "next/dynamic";
import HeroScroller from "./components/Herosection";
import Header from "./components/Header";

// Dynamically load below-the-fold components
const PortfolioSection = dynamic(() => import("./components/portfolio"));
const AboutSection = dynamic(() => import("./components/about"));
const SkillsSection = dynamic(() => import("./components/skill"));
const TestimonialsSection = dynamic(() => import("./components/testimonials"));
const ContactSection = dynamic(() => import("./components/contact"));
const Footer = dynamic(() => import("./components/footer"));
const ScrollProgressButton = dynamic(() => import("./components/ScrollProgressButton"));

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
