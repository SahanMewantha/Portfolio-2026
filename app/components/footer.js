"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reddit SVG icon since lucide-react doesn't have one
const RedditIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="7" />
    <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
    <path d="M10 16.5c.5.5 1.2.8 2 .8s1.5-.3 2-.8" />
    <path d="M19.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M16 8l3-2.5" />
    <path d="M12 7V3l4 1" />
  </svg>
);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com/sahanmewantha", label: "Facebook" },
  { Icon: Instagram, href: "https://instagram.com/sahanmewantha", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com/in/sahanmewantha", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com/sahanmewantha", label: "GitHub" },
  { Icon: RedditIcon, href: "https://reddit.com/u/sahanmewantha", label: "Reddit", isCustom: true },
];

export default function Footer() {
  const footerRef = useRef(null);
  const innerRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax reveal: the footer content rises up as user scrolls
      gsap.set(innerRef.current, { yPercent: -35 });

      gsap.to(innerRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Staggered reveal of child elements
      const reveals = [
        headingRef.current,
        descRef.current,
        linksRef.current,
        socialsRef.current,
        dividerRef.current,
        bottomRef.current,
      ];

      gsap.set(reveals, { opacity: 0, y: 40 });

      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] overflow-hidden font-inter"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Fixed background for parallax depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#00d6ff]/6 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#6B21A8]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 214, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 214, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div ref={innerRef} className="relative z-10 pt-24 pb-8 md:pt-32 md:pb-10 px-6 sm:px-8 lg:px-16">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* Top Section — CTA Heading */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter text-white/90 mb-5"
            >
              Let&apos;s Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]">
                Extraordinary.
              </span>
            </h2>
            <p
              ref={descRef}
              className="text-white/40 text-lg md:text-xl 2xl:text-2xl font-medium tracking-tight max-w-2xl mx-auto"
            >
              Got a project in mind or just want to say hello? I&apos;m always
              open to discussing new opportunities, creative ideas, or
              partnerships.
            </p>
          </div>

          {/* Middle — Navigation Links */}
          <div ref={linksRef} className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 md:mb-16">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm md:text-base font-medium text-white/30 hover:text-[#00d6ff] transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div ref={socialsRef} className="flex justify-center items-center gap-4 md:gap-5 mb-14 md:mb-16">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] text-white/40 bg-white/[0.02] hover:text-[#00d6ff] hover:border-[#00d6ff]/40 hover:bg-[#00d6ff]/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[#00d6ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  {social.isCustom ? (
                    <social.Icon size={20} />
                  ) : (
                    <social.Icon size={20} />
                  )}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div ref={dividerRef} className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div ref={bottomRef} className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs md:text-sm text-white/20 tracking-wide">
              © {new Date().getFullYear()} Sahan Mewantha. All rights reserved.
            </p>
            <p className="text-xs md:text-sm text-white/20 tracking-wide">
              Designed & Developed by{" "}
              <a
                href="https://github.com/sahanmewantha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00d6ff]/50 hover:text-[#00d6ff] transition-colors duration-300"
              >
                Sahan Mewantha
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
