"use client"
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from './DecryptedText';
import MagicRings from './MagicRings';
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const ROLES = ["Software Engineer", "Web Developer", "Mobile Developer", "Problem Solver"];
export default function AboutMe() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const nameRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const iconsRef = useRef(null);
  const tagRef = useRef(null);
  const roleRef = useRef(null);
  const dividerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setTyping(true);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(cursorInterval);
  }, []);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [tagRef.current, headingRef.current, nameRef.current, roleRef.current, dividerRef.current, textRef.current, iconsRef.current],
        { opacity: 0, y: 40 }
      );
      gsap.set(imageRef.current, { 
        opacity: 0, 
        x:0, 
        scale: 0.6, 
        rotation: 0,
        filter: "brightness(0) contrast(200%)"
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(imageRef.current, {
      scale: 1.3,
      ease: "none", 
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "bottom top",   
        scrub: 1,           
      },
    });

      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(dividerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")

        .to(imageRef.current, { 
          opacity: 1, 
          x: 0, 
          scale: 0.9, 
          rotation: 0,
          filter: "brightness(1) contrast(100%)",
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }, "-=0.5")
      
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(iconsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

      gsap.to(".about-glow", {
        scale: 1.08,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section 
      className="min-h-screen bg-[#050505] flex items-center justify-center py-20 px-8 relative overflow-hidden font-inter" 
      ref={sectionRef} 
      id="about"
    >
      {/* Background Grid & Radial */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 214, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 214, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0, 214, 255, 0.06) 0%, transparent 70%)`
        }}
      />
      
      <div className="max-w-[1160px] 2xl:max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10 mx-auto text-center md:text-left overflow-visible">
        
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col items-center md:items-start order-2 md:order-1">
          <div 
            ref={tagRef} 
            className="inline-flex items-center justify-center gap-2 font-firacode text-xs text-[#00d6ff] border border-[rgba(0,214,255,0.3)] px-3.5 py-1.5 rounded mb-6 tracking-widest bg-[rgba(0,214,255,0.04)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d6ff] animate-pulse" />
            &lt;about_me /&gt;
          </div>
          <p ref={headingRef} className="font-firacode text-base text-white/50 mb-1.5 tracking-wide">
            <DecryptedText
            text="Hello World"
            animateOn="hover"
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
          />
          </p>
          <div ref={nameRef}>
            <h1 className="font-firacode text-[clamp(2.5rem,6vw,4.5rem)] 2xl:text-[5.5rem] font-bold text-white leading-[1.1] mb-3 tracking-tighter">
             <DecryptedText text="I'm" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]"><DecryptedText text="Sahan" /></span><br /><DecryptedText text="Mewantha" />
            </h1>
          </div>
          
          <div ref={roleRef} className="font-firacode text-lg 2xl:text-xl text-white/70 mb-8 min-h-[1.6em] tracking-wide">
            {displayed}
            <span className="inline-block text-[#00d6ff] font-bold ml-0.5" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
          </div>
          
          <div ref={dividerRef} className="w-[60px] h-0.5 bg-gradient-to-r from-[#00d6ff] to-transparent mb-6 rounded-sm" />
          <div ref={textRef}>
            <p className="text-base 2xl:text-xl leading-relaxed text-white/60 mb-10 max-w-[550px] 2xl:max-w-[700px] font-light font-inter">
              A <strong className="text-white/90 font-medium">dedicated software engineer</strong> holding an HND from NIBM,
              with hands-on industry experience gained during a
              <strong className="text-white/90 font-medium"> 6-month internship at Sri Lanka Telecom</strong> — delivering
              high-quality web and mobile solutions in a live enterprise environment.
              Driven by a passion for <strong className="text-white/90 font-medium">building innovative, reliable systems</strong> that
              tackle real-world problems with clean architecture and thoughtful design.
            </p>
          </div>
          <div ref={iconsRef} className="flex items-center justify-center md:justify-start gap-4">
            <a 
              href="https://github.com/sahanmewantha" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl border border-[rgba(0,214,255,0.25)] text-white/60 hover:text-[#00d6ff] hover:border-[#00d6ff] hover:-translate-y-1 transition-all duration-300 bg-[rgba(0,214,255,0.03)] relative overflow-hidden group"
              aria-label="GitHub"
            >
              <div className="absolute inset-0 bg-[rgba(0,214,255,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Github size={22} className="relative z-10" />
            </a>
            <a 
              href="https://linkedin.com/in/sahanmewantha" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl border border-[rgba(0,214,255,0.25)] text-white/60 hover:text-[#00d6ff] hover:border-[#00d6ff] hover:-translate-y-1 transition-all duration-300 bg-[rgba(0,214,255,0.03)] relative overflow-hidden group"
              aria-label="LinkedIn"
            >
              <div className="absolute inset-0 bg-[rgba(0,214,255,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Linkedin size={22} className="relative z-10" />
            </a>
            <span className="font-firacode text-xs 2xl:text-sm text-white/25 ml-2">
              @sahanmewantha
            </span>
          </div>
        </div>
        {/* ── RIGHT COLUMN ── */}
        <div className="relative flex justify-center items-center order-1 md:order-2 w-full min-h-[400px] md:min-h-[500px] 2xl:min-h-[700px]" ref={imageRef}>
          {/* Magic Rings Background - scaling larger so it bleeds out freely */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none scale-[1.5] md:scale-[1.8] 2xl:scale-[2.4]">
            <div style={{ width: '1000px', height: '500px', position: 'relative' }}>
              <MagicRings
                color="#00d6ff"
                colorTwo="#050505"
                ringCount={5}
                speed={1.5}
                attenuation={10}
                lineThickness={2}
                baseRadius={0.3}
                radiusStep={0.12}
                scaleRate={0.1}
                opacity={0.8}
                blur={0}
                noiseAmount={0.05}
                rotation={0}
                ringGap={1.5}
                fadeIn={0.7}
                fadeOut={0.5}
                followMouse={true}
                mouseInfluence={0.15}
                hoverScale={1.1}
                parallax={0.05}
                clickBurst={false}
              />
            </div>
          </div>
          
          {/* Image Container with Hover Scale */}
          <div className="relative z-10 group cursor-pointer">
            {/* Rounded Image Frame - Larger on 2xl */}
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] 2xl:w-[600px] 2xl:h-[600px] rounded-full overflow-hidden border-2 border-[rgba(0,214,255,0.3)] shadow-[0_0_40px_rgba(0,214,255,0.15),inset_0_0_60px_rgba(0,214,255,0.08)] bg-[#050505] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:border-[rgba(0,214,255,0.6)] group-hover:shadow-[0_0_60px_rgba(0,214,255,0.3)]">
              <Image 
                src="/me.png" 
                alt="Sahan Mewantha" 
                fill
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1536px) 380px, 600px"
                className="object-cover object-top contrast-105 brightness-95 mix-blend-normal transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-50" style={{ background: 'linear-gradient(160deg, rgba(0, 214, 255, 0.12) 0%, transparent 40%, rgba(0, 214, 255, 0.06) 100%)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
