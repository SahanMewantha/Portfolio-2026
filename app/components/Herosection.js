"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── SVG Tech Icons ───
const TechIcons = {
  NextJS: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6H35.1V40.5h13.4l50.7 74.1C107.2 104.7 128 86.1 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V40.5h7.5v44.1z"/>
    </svg>
  ),
  Flutter: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M12.3 64.2L76.3 0h39.4L39.4 76.5zm64 63.6h39.4L81.4 93.1l34.3-34.8H76.3L42 93.1z"/>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.45 31.45 0 019.63.36zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1l21.81.06z"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M64 53.77a10.23 10.23 0 1010.23 10.23A10.24 10.24 0 0064 53.77zm0 0"/>
      <path d="M64 38.4c-2.9 0-5.77.2-8.58.55-1.4-2.38-2.9-4.66-4.48-6.8C46.47 26.1 41.3 21.9 36.53 21.9c-1.22 0-2.43.27-3.55.84-4.84 2.5-6.67 9.28-5.08 18.95a60.16 60.16 0 001.67 7.66 59.77 59.77 0 00-7.1 3.25C14.7 56.53 10 61.4 10 66.23c0 4.86 4.7 9.7 12.47 13.63a59.7 59.7 0 007.1 3.25 60.22 60.22 0 00-1.67 7.67c-1.6 9.67.24 16.45 5.08 18.95a8.7 8.7 0 003.55.83c4.77 0 9.94-4.2 14.41-10.25 1.58-2.14 3.07-4.42 4.48-6.8 2.8.36 5.68.55 8.58.55s5.77-.2 8.58-.55c1.4 2.38 2.9 4.67 4.48 6.8 4.47 6.06 9.64 10.25 14.41 10.25 1.22 0 2.43-.27 3.55-.83 4.84-2.5 6.67-9.28 5.08-18.95a60.22 60.22 0 00-1.67-7.67 59.7 59.7 0 007.1-3.25C113.3 75.93 118 71.1 118 66.23c0-4.84-4.7-9.7-12.47-13.6a59.77 59.77 0 00-7.1-3.25 60.16 60.16 0 00-1.67-7.66c-1.6-9.67-.24-16.45-5.08-18.95a8.7 8.7 0 00-3.55-.84c-4.77 0-9.94 4.2-14.41 10.26-1.58 2.13-3.07 4.41-4.48 6.79-2.8-.35-5.68-.53-8.58-.53zm0 4.1c2.6 0 5.17.17 7.7.47a90.87 90.87 0 00-7.7 13.56 91.3 91.3 0 00-7.7-13.55c2.53-.3 5.1-.47 7.7-.47zm-14.15 2a98.63 98.63 0 018.55 14.87 98.5 98.5 0 00-14.17 5.57 50.05 50.05 0 01-1.43-6.55c-1.1-6.64-.18-11.1 1.96-12.23a4.64 4.64 0 011.8-.35c.87 0 2.1.44 3.5 1.7zm28.3 0c1.39-1.26 2.62-1.7 3.49-1.7.64 0 1.26.12 1.8.35 2.14 1.1 3.06 5.6 1.96 12.23a50.05 50.05 0 01-1.43 6.55 98.5 98.5 0 00-14.17-5.57 98.63 98.63 0 018.55-14.87zM64 55.43a87.16 87.16 0 018.8 14.82 87.16 87.16 0 01-17.6 0A87.06 87.06 0 0164 55.43zm-22.47 6.38a94.36 94.36 0 0115.04 5.82 93.65 93.65 0 00-8.41 12.7 94.14 94.14 0 01-6.64-18.52zm44.94 0a93.58 93.58 0 01-6.63 18.52 93.65 93.65 0 00-8.41-12.7 94.36 94.36 0 0115.04-5.82zM25.37 57.35a55.71 55.71 0 016.53-2.98 100.55 100.55 0 00-.06 23.72 55.56 55.56 0 01-6.53-2.98C19 71.44 14.1 68 14.1 66.23c0-1.73 4.9-5.22 11.27-8.88zm77.26 0c6.37 3.66 11.27 7.15 11.27 8.88 0 1.77-4.9 5.2-11.27 8.76a55.56 55.56 0 01-6.53 2.98 100.55 100.55 0 00-.06-23.72 55.71 55.71 0 016.59 3.1zM55.52 79.68a94.36 94.36 0 0016.96 0 93.65 93.65 0 01-8.48 12.73 93.65 93.65 0 01-8.48-12.73zm-9.09 4.18a93.58 93.58 0 006.63 18.52 50.05 50.05 0 01-6.55-2.15c-1.43-.72-2.5-1.52-3.24-2.36a98.5 98.5 0 002.87-1.23 94.14 94.14 0 00.29-12.78zm35.14 0a94.14 94.14 0 00.29 12.78 98.5 98.5 0 002.87 1.23 13.92 13.92 0 01-3.24 2.36 50.05 50.05 0 01-6.55 2.15 93.65 93.65 0 006.63-18.52zm-21.42 3.32a98.63 98.63 0 008.55 14.87c-2.53.3-5.1.47-7.7.47s-5.17-.17-7.7-.47a98.63 98.63 0 008.55-14.87z"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M66.958.825a6.07 6.07 0 00-5.916 0L3.369 34.831A5.851 5.851 0 00.453 40.37v64.295a5.851 5.851 0 002.916 5.537l57.673 33.944a6.07 6.07 0 005.916 0l57.673-33.944a5.851 5.851 0 002.916-5.537V40.37a5.851 5.851 0 00-2.916-5.537z"/>
      <path fill="#050505" d="M101.66 96.89c-2.096 0-3.476-.697-4.942-2.347l-.046-.046c-1.233-1.466-1.698-3.35-1.698-5.722V55.27c0-2.51.93-4.3 2.767-5.304 1.7-.93 3.908-1.07 5.702-.363 1.14.442 2.093 1.233 2.696 2.232.743 1.233 1.14 2.883 1.14 4.9V67.62c0 2.51-2.05 4.53-4.575 4.53h-2.255V55.27c0-1.116-.21-1.93-.63-2.49-.418-.558-1.022-.883-1.69-.93-.72-.046-1.418.186-1.93.65-.512.466-.79 1.116-.79 1.85v33.424c0 2.836 1.605 4.482 3.943 4.482.93 0 1.93-.278 2.627-.79.697-.512 1.116-1.22 1.116-2.01V80.22c0-.604-.186-1.116-.558-1.512-.372-.396-.883-.604-1.465-.604h-2.835v-4.994h3.07c1.302 0 2.372.512 3.118 1.465.744.952 1.14 2.278 1.14 3.82v9.43c0 2.835-1 5.07-2.928 6.42-1.558 1.116-3.397 1.64-5.19 1.64zm-37.01.046c-2.51 0-4.67-.79-6.28-2.278-1.65-1.512-2.49-3.58-2.49-5.99V55.27c0-2.51.93-4.3 2.767-5.304 1.7-.93 3.908-1.07 5.7-.363 1.14.442 2.093 1.233 2.697 2.232.743 1.233 1.14 2.883 1.14 4.9V82.89c0 .697-.232 1.302-.65 1.79-.42.49-.977.79-1.605.883-.628.093-1.28-.046-1.79-.418-.558-.372-.883-.977-.883-1.652V55.27c0-1.116-.21-1.93-.63-2.49-.418-.558-1.022-.883-1.69-.93-.72-.046-1.418.186-1.93.65-.512.466-.79 1.116-.79 1.85v33.334c0 1.466.372 2.697 1.07 3.58.697.883 1.698 1.372 2.882 1.372 1.535 0 2.79-.604 3.58-1.698V82.1h5.07v6.42c-.046 2.37-.837 4.3-2.35 5.7-1.51 1.395-3.58 2.14-5.79 2.14zm-23.684 0c-2.51 0-4.67-.79-6.28-2.278-1.65-1.512-2.49-3.58-2.49-5.99V61.12h-4.53V56.126h4.53v-9.337h5.07v9.337h5.02v4.994h-5.02V88.62c0 1.466.372 2.697 1.07 3.58.697.883 1.698 1.372 2.882 1.372.697 0 1.302-.14 1.79-.418V97.7c-.93.14-1.7.232-2.047.232z"/>
    </svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 128 128" fill="currentColor" width="100%" height="100%">
      <path d="M23.01 97.95L38.17 15.33a2.24 2.24 0 014.28-.46l15.71 29.55L23.01 97.95zM105.35 97.95L89.1 35.67a2.24 2.24 0 00-3.92-.58L23.01 97.95l37.82 21.24a8.5 8.5 0 008.33 0l36.19-21.24zM68.03 43.52L57.93 23.21a2.24 2.24 0 00-3.96 0L23.01 97.95l45.02-54.43z"/>
    </svg>
  ),
};

// ─── Terminal Lines ───
const terminalLines = [
  { delay: 0,    text: "$ npx create-next-app@latest --typescript", color: "#00d6ff" },
  { delay: 1.2,  text: "✓ Installing dependencies...", color: "rgba(255,255,255,0.5)" },
  { delay: 2.1,  text: "$ flutter pub get", color: "#00d6ff" },
  { delay: 3.0,  text: "✓ Running pub upgrade --major-versions", color: "rgba(255,255,255,0.5)" },
  { delay: 3.8,  text: "$ git push origin main", color: "#00d6ff" },
  { delay: 4.5,  text: "✓ Deployed to production 🚀", color: "#4ade80" },
];

// ─── Floating Icons Config ───
const floatingIcons = [
  { id: "icon-next",     Icon: TechIcons.NextJS,     label: "Next.js",    top: "12%", right: "8%",   size: 38, initX: 40,  color: "#FFFFFF" },
  { id: "icon-flutter",  Icon: TechIcons.Flutter,    label: "Flutter",    top: "32%", right: "20%",  size: 34, initX: 40, color: "#40D1FB" },
  { id: "icon-ts",       Icon: TechIcons.TypeScript, label: "TypeScript", top: "50%", right: "6%",   size: 36, initX: 40,  color: "#3178C6" },
  { id: "icon-react",    Icon: TechIcons.React,      label: "React",      top: "68%", right: "22%",  size: 34, initX: 40,  color: "#61DAFB" },
  { id: "icon-node",     Icon: TechIcons.NodeJS,     label: "Node.js",    top: "84%", right: "10%",  size: 32, initX: 40, color: "#68A063" },
  { id: "icon-firebase", Icon: TechIcons.Firebase,   label: "Firebase",   top: "88%", right: "26%",  size: 30, initX: 40, color: "#FFCA28" },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const iconsWrapperRef = useRef(null);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [terminalVisible, setTerminalVisible] = useState([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;

    // ─── Cursor ───
    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursor) gsap.to(cursor, { x: mx - 5, y: my - 5, duration: 0.1 });
    };
    
    const animateRing = () => {
      rx += (mx - rx - 20) * 0.12;
      ry += (my - ry - 20) * 0.12;
      if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(animateRing);
    };
    
    window.addEventListener("mousemove", onMouseMove);
    animateRing();

    document.querySelectorAll("a, button, .cv-btn").forEach(el => {
      el.addEventListener("mouseenter", () => ring && gsap.to(ring, { width: 60, height: 60, borderColor: "rgba(0,214,255,0.7)", duration: 0.3 }));
      el.addEventListener("mouseleave", () => ring && gsap.to(ring, { width: 40, height: 40, borderColor: "rgba(0,214,255,0.4)", duration: 0.3 }));
    });

    // ─── Terminal typewriter ───
    terminalLines.forEach((line, i) => {
      setTimeout(() => setTerminalVisible(prev => [...prev, i]), (line.delay + 1.5) * 1000);
    });

    const ctx = gsap.context(() => {

      // ─── Entrance Timeline ───
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to("#nav-name",        { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .to("#cv-btn",          { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        .to("#eyebrow",         { opacity: 1, y: 0, duration: 0.7 }, 0.6)
        .to(".word-inner",      { translateY: "0%", duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.75)
        .to("#reveal-line",     { width: 60, opacity: 0.35, duration: 0.8, ease: "power3.inOut" }, 1.3)
        .to("#subtext",         { opacity: 1, y: 0, duration: 0.8 }, 1.5)
        .to("#cta-group",       { opacity: 1, y: 0, duration: 0.7 }, 1.7)
        .to("#terminal-widget", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.8)
        .to("#scroll-indicator",{ opacity: 1, duration: 1 }, 2.5);

      // ─── Floating icons entrance ───
      floatingIcons.forEach((icon, i) => {
        tl.fromTo(`#${icon.id}`,
          { opacity: 0, x: icon.initX, scale: 0.7 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
          1.6 + i * 0.12
        );
      });

      // ─── Parallax on scroll (Background) ───
      gsap.to("#parallax-bg", {
        y: "25%", ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to("#parallax-mid", {
        y: "-18%", ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
      });

      // ─── Content Fade-out Logic (Fixed) ───
      // Gently scale down and fade out when scrolling down.
      gsap.to([contentWrapperRef.current, iconsWrapperRef.current], {
        opacity: 0,
        y: -100,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "60% top",
          scrub: 1, // Add easing to scrub
        }
      });

      // ─── Icons parallax ───
      floatingIcons.forEach((icon, i) => {
        const speed = 0.6 + i * 0.25;
        gsap.to(`#${icon.id}`, {
          y: i % 2 === 0 ? "-200px" : "-150px", 
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: speed }
        });
      });

      // ─── Ambient float loops ───
      floatingIcons.forEach((icon, i) => {
        gsap.to(`#${icon.id}`, {
          y: `+=${8 + i * 2}`, repeat: -1, yoyo: true,
          duration: 2.8 + i * 0.5, ease: "sine.inOut", delay: i * 0.4
        });
      });

      // ─── Scroll indicator ───
      gsap.to("#scroll-indicator", {
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "10% top", scrub: true }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #050505; }
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        .vertical-rl { writing-mode: vertical-rl; }

        /* noise overlay */
        #hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50;
          opacity: 0.55;
        }

        /* cv btn hover fill */
        .cv-btn { position: relative; overflow: hidden; transition: color 0.3s; color: #00d6ff; border: 1px solid rgba(0,214,255,0.3); }
        .cv-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #00d6ff;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cv-btn:hover::before { transform: translateX(0); }
        .cv-btn:hover { color: #050505 !important; }
        .cv-btn span { position: relative; z-index: 1; }

        /* icon card */
        .icon-card {
          backdrop-filter: blur(10px);
          background: rgba(0,214,255,0.04);
          border: 1px solid rgba(0,214,255,0.15);
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .icon-card:hover {
          background: rgba(0,214,255,0.1);
          border-color: rgba(0,214,255,0.45);
          box-shadow: 0 0 24px rgba(0,214,255,0.18);
        }

        /* terminal */
        .terminal-window {
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(0,214,255,0.2);
          backdrop-filter: blur(16px);
        }
        .terminal-bar { background: rgba(0,214,255,0.06); border-bottom: 1px solid rgba(0,214,255,0.12); }
        .terminal-dot { width:10px;height:10px;border-radius:50%; }
        .term-line { opacity: 0; animation: termFadeIn 0.4s ease forwards; }
        @keyframes termFadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        .cursor-blink { display:inline-block; width:8px; height:14px; background:#00d6ff; vertical-align:middle; animation: blink 1.1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* cta glow */
        .cta-primary { transition: box-shadow 0.3s, transform 0.2s; }
        .cta-primary:hover { box-shadow: 0 0 40px rgba(0,214,255,0.4); transform: scale(1.04); }

        /* scan line */
        .scanline {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,214,255,0.012) 2px, rgba(0,214,255,0.012) 4px);
          z-index: 51;
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} style={{ position:"fixed", width:10, height:10, background:"#00d6ff", borderRadius:"50%", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <div ref={ringRef} style={{ position:"fixed", width:40, height:40, border:"1px solid rgba(0,214,255,0.4)", borderRadius:"50%", pointerEvents:"none", zIndex:9998 }} />

      <section
        ref={containerRef}
        id="hero"
        className="font-syne relative w-full min-h-screen flex flex-col overflow-hidden"
        style={{ background: "#050505" }}
      >
        {/* Scanline texture */}
        <div className="scanline" />

        {/* Parallax BG */}
        <div id="parallax-bg" className="absolute inset-0 pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(0,214,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,214,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }} />
          {/* Orbs */}
          <div className="absolute rounded-full" style={{ top:-200, left:-200, width:600, height:600, background:"rgba(0,214,255,0.07)", filter:"blur(120px)" }} />
          <div className="absolute rounded-full" style={{ bottom:0, right:-100, width:400, height:400, background:"rgba(0,214,255,0.05)", filter:"blur(120px)" }} />
        </div>

        {/* Decorative circles */}
        <div id="parallax-mid" className="absolute pointer-events-none rounded-full" style={{ top:"12%", right:"8%", width:380, height:380, border:"1px solid rgba(0,214,255,0.07)" }} />
        <div className="absolute pointer-events-none rounded-full" style={{ top:"18%", right:"14%", width:240, height:240, border:"1px solid rgba(0,214,255,0.04)" }} />

        {/* ─── Floating Tech Icons ─── */}
        <div ref={iconsWrapperRef} className="absolute inset-0 pointer-events-none z-10 hidden md:flex">
          {floatingIcons.map(({ id, Icon, label, top, right, left, size, color }) => (
            <div
              key={id}
              id={id}
              className="icon-card absolute flex flex-col items-center gap-1.5 p-3 rounded-xl pointer-events-none"
              style={{ top, right, left }}
            >
              <div style={{ width: size, height: size, color: color, opacity: 0.9 }}>
                <Icon />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{label}</span>
            </div>
          ))}
        </div>

        {/* ─── NAV ─── */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8">
          <div id="nav-name" className="font-mono text-[13px] tracking-[0.15em]" style={{ opacity:0, color:"rgba(255,255,255,0.45)" }}>
            <span style={{ color:"#00d6ff" }}>//</span> Sahan Mewantha
          </div>
          <a href="/cv.pdf" download id="cv-btn" className="cv-btn font-mono text-[11px] uppercase tracking-widest px-5 py-2.5" style={{ opacity:0 }}>
            <span>↓ Download CV</span>
          </a>
        </nav>

        {/* ─── MAIN CONTENT ─── */}
        <div ref={contentWrapperRef} className="relative z-20 flex flex-col justify-center flex-1 px-8 md:px-16 pb-16 mt-8 max-w-5xl">

          {/* Eyebrow */}
          <p id="eyebrow" className="font-mono text-[11px] uppercase tracking-[0.28em] mb-6" style={{ opacity:0, color:"#00d6ff" }}>
            // Software Engineer
          </p>

          {/* Headline */}
          <h1 id="headline" className="font-inter font-bold tracking-tighter leading-[1.2] text-white mb-8"
            style={{ fontSize:"clamp(3rem,8vw,6.5rem)" }}>
            <div style={{ display:"inline-block", overflow:"hidden", verticalAlign:"bottom" }}>
              <span className="word-inner" style={{ display:"inline-block", transform:"translateY(110%)" }}>I Build</span>
            </div>
            <br />
            <div style={{ display:"inline-block", overflow:"hidden", verticalAlign:"bottom", paddingRight: "4px" }}>
              <span className="word-inner text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]" style={{ display:"inline-block", transform:"translateY(110%)" }}>Digital</span>
            </div>
            <div style={{ display:"inline-block", overflow:"hidden", verticalAlign:"bottom" }}>
              <span className="word-inner" style={{ display:"inline-block", transform:"translateY(110%)" }}>&nbsp;Worlds.</span>
            </div>
          </h1>

          {/* Reveal line */}
          <div id="reveal-line" style={{ width:0, height:1, background:"#00d6ff", opacity:0, marginBottom:"2rem" }} />

          {/* Sub text */}
          <p id="subtext" className="font-mono text-[13px] leading-[1.9] max-w-sm mb-10" style={{ opacity:0, color:"rgba(255,255,255,0.38)" }}>
            Web apps that scale.<br />
            Mobile apps that captivate.<br />
            Experiences that linger.
          </p>

          {/* CTAs */}
          <div id="cta-group" className="flex items-center gap-8" style={{ opacity:0 }}>
            <button
              onClick={() => scrollTo("portfolio")}
              className="cta-primary font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4"
              style={{ background:"#00d6ff", color:"#050505" }}
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group font-mono text-[11px] uppercase tracking-widest flex items-center gap-3 transition-colors duration-300"
              style={{ color:"rgba(255,255,255,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00d6ff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <span style={{ display:"block", width:32, height:1, background:"currentColor", transition:"width 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.width = "52px")}
                onMouseLeave={e => (e.currentTarget.style.width = "32px")}
              />
              Let&apos;s Talk
            </button>
          </div>

          {/* ─── Terminal Widget ─── */}
          <div id="terminal-widget" className="terminal-window rounded-xl mt-14 max-w-md" style={{ opacity:0 }}>
            {/* Top bar */}
            <div className="terminal-bar flex items-center gap-2 px-4 py-2.5 rounded-t-xl">
              <div className="terminal-dot" style={{ background:"#ff5f57" }} />
              <div className="terminal-dot" style={{ background:"#febc2e" }} />
              <div className="terminal-dot" style={{ background:"#28c840" }} />
              <span className="font-mono text-[10px] ml-3 tracking-widest" style={{ color:"rgba(0,214,255,0.35)" }}>~/sahan-mewantha/portfolio</span>
            </div>
            {/* Terminal body */}
            <div className="px-4 py-3 space-y-1" style={{ minHeight: 150 }}>
              {terminalLines.map((line, i) => (
                terminalVisible.includes(i) && (
                  <div key={i} className="term-line font-mono text-[11px] leading-relaxed" style={{ color: line.color }}>
                    {line.text}
                  </div>
                )
              ))}
              <div className="font-mono text-[11px]" style={{ color:"rgba(0,214,255,0.6)" }}>
                <span>$ </span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div id="scroll-indicator" className="absolute bottom-8 left-1/2 flex flex-col items-center gap-3 pointer-events-none z-10" style={{ opacity:0, transform:"translateX(-50%)" }}>
          <span className="font-mono vertical-rl text-[9px] uppercase tracking-[0.22em]" style={{ color:"rgba(255,255,255,0.22)" }}>scroll</span>
          <div style={{ width:1, height:52, background:"linear-gradient(to bottom, rgba(0,214,255,0.6), transparent)" }} />
        </div>
      </section>
    </>
  );
}