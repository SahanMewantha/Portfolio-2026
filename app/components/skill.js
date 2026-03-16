"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Database, Server, Wrench, Palette,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techStack = [
  {
    category: "Web & UI/UX",
    icon: <Palette size={18} />,
    tools: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "GSAP", logo: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
    ],
  },
  {
    category: "Languages",
    icon: <Code2 size={18} />,
    tools: [
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    ],
  },
  {
    category: "Databases",
    icon: <Database size={18} />,
    tools: [
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    category: "Backend",
    icon: <Server size={18} />,
    tools: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    ],
  },
  {
    category: "Tools",
    icon: <Wrench size={18} />,
    tools: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 bg-[#050505] py-28 md:py-36 overflow-hidden font-inter"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#00d6ff]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#6B21A8]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter text-white/90 mb-4"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]">Arsenal.</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-white/40 text-lg md:text-xl 2xl:text-2xl font-medium tracking-tight max-w-xl mx-auto"
          >
            Industry-leading tools to design, develop, and deploy.
          </p>
        </div>
      </div>

      {/* Marquee Rows — one per category */}
      <div className="flex flex-col gap-4 md:gap-6">
        {techStack.map((stack, idx) => (
          <div key={idx} className="relative w-full overflow-hidden py-2">
            {/* Fading edges */}
            <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div
              className={`flex w-max items-center gap-4 md:gap-6 px-4 ${
                idx % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
              }`}
            >
              {/* Loop 4x for seamless infinite scroll */}
              {[...stack.tools, ...stack.tools, ...stack.tools, ...stack.tools].map(
                (tool, tIdx) => (
                  <div
                    key={tIdx}
                    className="group flex items-center gap-3 px-5 py-3.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl hover:bg-white/5 hover:border-[#00d6ff]/30 transition-all duration-300 cursor-default flex-shrink-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center p-1.5 group-hover:bg-white/10 transition-colors duration-300 overflow-hidden flex-shrink-0">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-white/40 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}