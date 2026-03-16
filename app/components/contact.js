"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import {
  Send,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactCards = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+94 76 123 4567",
    href: "https://wa.link/ll6fye",
    color: "#25D366",
    bg: "from-[#25D366]/20 to-[#25D366]/5",
  },
  {
    icon: Phone,
    label: "Call Me",
    value: "+94 76 556 8860",
    href: "tel:+94765568860",
    color: "#00d6ff",
    bg: "from-[#00d6ff]/20 to-[#00d6ff]/5",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sahanmewantha00@.com",
    href: "mailto:sahanmewantha00@.com",
    color: "#FF6B6B",
    bg: "from-[#FF6B6B]/20 to-[#FF6B6B]/5",
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger children with scale + fade entrance
      const revealEls = innerRef.current.querySelectorAll("[data-reveal]");
      gsap.set(revealEls, { opacity: 0, y: 60, scale: 0.97 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(revealEls, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.18,
      });

      // Floating glow pulse
      gsap.to(".contact-glow", {
        scale: 1.15,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_eoj137k",
        "template_zt6i1gb",
        formRef.current,
        "MB0zaOz-ahk-D-D5D"
      )
      .then(
        () => {
          setIsSubmitted(true);
          setIsSending(false);
        },
        (error) => {
          console.log(error.text);
          setIsSending(false);
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 overflow-hidden font-inter"
    >
      {/* Two-tone background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[55%] bg-[#050505]" />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[#041e2b]" />
        <div className="absolute top-[45%] left-0 right-0 h-[20%] bg-gradient-to-b from-[#050505] to-[#041e2b]" />

        {/* Decorative glows */}
        <div className="contact-glow absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#00d6ff]/6 rounded-full blur-[200px]" />
        <div className="contact-glow absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#00d6ff]/4 rounded-full blur-[180px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,214,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,214,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Parallax inner container */}
      <div
        ref={innerRef}
        className="relative z-10 py-28 md:py-40 px-6 sm:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* ── TOP: Big Bold Heading ── */}
          <div className="mb-20 md:mb-28" data-reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00d6ff]/10 border border-[#00d6ff]/20 flex items-center justify-center">
                <Sparkles size={18} className="text-[#00d6ff]" />
              </div>
              <span className="text-xs font-firacode text-[#00d6ff] uppercase tracking-[0.25em]">
                Contact
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold tracking-tighter text-white/90 leading-[0.95] mb-6">
              Let&apos;s Start a<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d6ff] via-[#0093c0] to-[#006080]">
                Conversation.
              </span>
            </h2>
            <p className="text-white/35 text-lg md:text-xl max-w-2xl leading-relaxed">
              Whether it&apos;s a full-scale product, a quick freelance gig, or just a
              creative brainstorm — I&apos;m all ears.
            </p>
          </div>

          {/* ── MIDDLE: Quick Contact Cards ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20 md:mb-28"
            data-reveal
          >
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "WhatsApp" ? "_blank" : undefined}
                rel={card.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-5 p-5 md:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400 overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 20% 50%, ${card.color}0A, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}18, ${card.color}08)`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <card.icon size={24} style={{ color: card.color }} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white/80 mb-0.5 tracking-tight">
                    {card.label}
                  </h4>
                  <p className="text-sm text-white/30 font-firacode truncate">
                    {card.value}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={18}
                  className="relative z-10 text-white/15 group-hover:text-white/50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                />
              </a>
            ))}
          </div>

          {/* ── BOTTOM: Split Layout — Info + Form ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16"
            data-reveal
          >
            {/* Left — Big Text + Details */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight mb-6 leading-tight">
                Drop me a <br className="hidden md:block" />
                message.
              </h3>
              <p className="text-white/35 text-base leading-relaxed mb-8">
                I typically respond within 24 hours. For urgent projects, 
                reach me directly via WhatsApp or phone.
              </p>

              {/* Mini stats */}
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-[#00d6ff] mb-1">24h</p>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Avg Reply</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#00d6ff] mb-1">50+</p>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#00d6ff] mb-1">100%</p>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Commitment</p>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="relative p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0a0a0a]/50 backdrop-blur-md overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#00d6ff]/4 rounded-full blur-[100px] pointer-events-none" />

                {!isSubmitted ? (
                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="relative z-10 flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white text-sm placeholder:text-white/20 outline-none focus:border-[#00d6ff]/40 focus:shadow-[0_0_0_3px_rgba(0,214,255,0.06)] transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@email.com"
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white text-sm placeholder:text-white/20 outline-none focus:border-[#00d6ff]/40 focus:shadow-[0_0_0_3px_rgba(0,214,255,0.06)] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Project Inquiry"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white text-sm placeholder:text-white/20 outline-none focus:border-[#00d6ff]/40 focus:shadow-[0_0_0_3px_rgba(0,214,255,0.06)] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        required
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white text-sm placeholder:text-white/20 outline-none focus:border-[#00d6ff]/40 focus:shadow-[0_0_0_3px_rgba(0,214,255,0.06)] transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="group w-full mt-2 py-4 bg-gradient-to-r from-[#00d6ff] to-[#0093c0] text-[#050505] text-sm font-bold rounded-xl hover:shadow-[0_4px_30px_rgba(0,214,255,0.3)] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send
                            size={16}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                          />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="relative z-10 text-center py-16">
                    <div className="w-20 h-20 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={36} className="text-[#25D366]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      Message Sent!
                    </h3>
                    <p className="text-white/35 text-base max-w-md mx-auto mb-6">
                      Thank you for reaching out. I&apos;ll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 text-sm font-medium text-[#00d6ff] border border-[#00d6ff]/25 rounded-xl hover:bg-[#00d6ff]/8 transition-all duration-300"
                    >
                      Send Another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
