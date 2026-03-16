"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDE_DURATION = 5000; // 5 seconds per slide

const testimonials = [
  {
    name: "Madhuka Vishwa",
    role: "Ceo of Seeker Moments",
    quote:
      "Sahan's ability to deliver clean, scalable code under tight deadlines was exceptional. His attention to detail and collaborative spirit made him a standout intern on our team.",
    image: "/seek.png",
    color: "#0050FF",
  },
  {
    name: "Uthbala Abaysinhe",
    role: "CEO of FTR Holdings",
    quote:
      "Working with Sahan was a game-changer for our mobile app project. He transformed our vision into a polished, performant Flutter application that exceeded all expectations.",
    image: "/uthpala.png",
    color: "#C2884E",
  },
  {
    name: "Chathur Gihan",
    role: "Social media exacative",
    quote:
      "The scalability and performance of the backend systems Sahan built have been remarkable. We've seen a 60% improvement in API response times since his implementation.",
    image: "/chathur.jpeg",
    color: "#6B21A8",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  const nameRef = useRef(null);
  const progressRefs = useRef([]);
  const autoPlayRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initial scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });
      gsap.set(contentRef.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate testimonial change
  const animateChange = useCallback(
    (newIndex) => {
      if (isAnimating || newIndex === current) return;
      setIsAnimating(true);
      setProgress(0);

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Fade out current
      tl.to([imageRef.current, quoteRef.current, nameRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
      });

      // Change data
      tl.call(() => setCurrent(newIndex));

      // Fade in new
      tl.fromTo(
        [imageRef.current, quoteRef.current, nameRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    },
    [isAnimating, current]
  );

  const goNext = useCallback(
    () => animateChange((current + 1) % testimonials.length),
    [current, animateChange]
  );
  const goPrev = useCallback(
    () => animateChange((current - 1 + testimonials.length) % testimonials.length),
    [current, animateChange]
  );

  // Auto-slide with progress
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
    }, 50);

    autoPlayRef.current = setTimeout(() => {
      const nextIndex = (current + 1) % testimonials.length;
      animateChange(nextIndex);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(autoPlayRef.current);
    };
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleManualChange = (newIndex) => {
    clearTimeout(autoPlayRef.current);
    setProgress(0);
    animateChange(newIndex);
  };

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#050505] py-24 md:py-32 px-6 sm:px-8 lg:px-16 overflow-hidden font-inter"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: `${t.color}10` }}
      />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter text-white/90 mb-4"
          >
            What Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]">
              Say.
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-white/40 text-lg md:text-xl 2xl:text-2xl font-medium tracking-tight max-w-xl"
          >
            Real feedback from people I've had the privilege to work with.
          </p>
        </div>

        <div ref={contentRef}>
          {/* Main testimonial card */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16 lg:gap-20">
            {/* Left — Photo */}
            <div ref={imageRef} className="relative flex-shrink-0">
              <div
                className="w-[240px] h-[300px] md:w-[280px] md:h-[360px] 2xl:w-[340px] 2xl:h-[420px] rounded-2xl overflow-hidden relative"
                style={{
                  boxShadow: `0 20px 60px ${t.color}25`,
                }}
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 768px) 240px, (max-width: 1536px) 280px, 340px"
                  className="object-cover object-center"
                />
                {/* Color tint overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-20 transition-colors duration-700"
                  style={{ backgroundColor: t.color }}
                />
              </div>

              {/* Decorative quote icon */}
              <div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shadow-lg"
                style={{ backgroundColor: `${t.color}20` }}
              >
                <Quote size={20} className="text-white/60" />
              </div>
            </div>

            {/* Right — Quote + Info */}
            <div className="flex flex-col justify-center flex-1 text-center md:text-left">
              <div ref={quoteRef}>
                <p className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-white/90 leading-relaxed tracking-tight mb-8 md:mb-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div ref={nameRef}>
                <h4 className="text-lg md:text-xl 2xl:text-2xl font-bold text-white tracking-tight mb-1">
                  {t.name}
                </h4>
                <p className="text-sm md:text-base 2xl:text-lg text-white/40 font-medium tracking-tight">
                  {t.role}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-12 md:mt-16">
            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleManualChange((current - 1 + testimonials.length) % testimonials.length)}
                disabled={isAnimating}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleManualChange((current + 1) % testimonials.length)}
                disabled={isAnimating}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Animated Progress bars */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualChange(i)}
                  disabled={isAnimating}
                  className="relative h-[3px] rounded-full overflow-hidden disabled:cursor-default bg-white/10 transition-all duration-500"
                  style={{ width: current === i ? "48px" : "20px" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-none"
                    style={{
                      width: current === i ? `${progress}%` : i < current ? "100%" : "0%",
                      backgroundColor: current === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
