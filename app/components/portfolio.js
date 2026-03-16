"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    brandName: "Seeker Moments",
    brandLogo: "seeker.png",
    category: "Business / Web3",
    technologies: ["NextJS", "Framer Motion", "Tailwind CSS"],
    images: [
      "/project/seek1.png",
      "/project/seek2.png",
      "/project/seek3.png"
    ],
    github: "https://github.com/yourusername/project1",
    live: "https://www.seekermoments.com/",
    size: "large"
  },
  {
    id: 2,
    brandName: "Chatur Gihan",
    brandLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&q=80",
    category: "Analytics / Dashboard",
    technologies: ["NextJS", "Framer Motion", "Tailwind CSS"],
    images: [
      "/project/cha1.png",
      "/project/cha2.png",
      "/project/cha3.png"
    ],
    github: "https://github.com/yourusername/project2",
    live: "https://www.chathurgihan.site/",
    size: "large"
  },
  {
    id: 3,
    brandName: "FTR Holdings",
    brandLogo: "/ftr.png",
    category: "Business / Web3",
    technologies: ["NextJS", "Framer Motion", "Tailwind CSS"],
    images: [
      "/project/ftr1.png",
      "/project/ftr2.png",
      "/project/ftr3.png"
    ],
    github: "https://github.com/yourusername/project3",
    live: "https://ftr-sigma.vercel.app/",
    size: "large"
  },
  {
    id: 4,
    brandName: "Sri Lanka Telecome",
    brandLogo: "/slt.png",
    category: "Financial/ Mobile",
    technologies: ["Flutter", "Firebase", "NodeJS", "MongoDB"],
    images: [
      "/project/sma1.png",
      "/project/sma2.png",
      "/project/sma3.png"
    ],
    size: "large"
  }
];

const universityProjects = [
  {
    id: 101,
    brandName: "Travel Recommendation System",
    brandLogo: "/project/tra1.png",
    category: "AI / Full-Stack",
    description: "An intelligent travel planning platform with a custom recommendation engine trained using Jupyter Notebook. Integrates Generative AI for personalized trip itineraries, destination suggestions, and budget optimization.",
    technologies: ["Next.js", "FastAPI", "Jupyter", "Gen AI"],
    images: [
      "/project/tra1.png",
      "/project/tra2.png",
      "/project/tra3.png"
    ],
    github: "https://github.com/sahanmewantha/travel-recommendation",
    size: "large"
  },
  {
    id: 102,
    brandName: "Farm Management POS",
    brandLogo: "/project/farm1.png",
    category: "POS / Management System",
    description: "A comprehensive point-of-sale and farm management system built with PHP. Features include customer management, farm item inventory tracking, an integrated billing system, and a real-time analytics dashboard.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    images: [
      "/project/farm1.png",
      "/project/farm2.png"
    ],
    github: "https://github.com/sahanmewantha/farm-pos",
    size: "small"
  },
  {
    id: 103,
    brandName: "Sri Cast",
    brandLogo: "/project/sri.png",
    category: "News / Mobile App",
    description: "A mobile news application built with Kotlin for Android, powered by a Node.js backend. Includes a Next.js admin dashboard for content moderation, reporter approvals, and post management.",
    technologies: ["Kotlin", "Node.js", "Next.js", "MongoDB"],
    images: [
      "/project/sri.png",
      "/project/sri1.png"
    ],
    github: "https://github.com/sahanmewantha/sri-cast",
    size: "small"
  },
  {
    id: 104,
    brandName: "Smart Garbage Bin Monitoring",
    brandLogo: "/project/re.png",
    category: "IoT / Dashboard",
    description: "An IoT-based garbage bin monitoring system showing real-time bin status and GPS locations. Features include automated collection scheduling, and analytics reporting for most active hours, collection times, and fill-rate patterns.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Firebase"],
    images: [
      "/project/re.png",
      "/project/re1.png",
      "/project/re2.png"
    ],
    github: "https://github.com/sahanmewantha/smart-bin",
    size: "large"
  }
];

function ProjectCard({ project, setRef }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovering && project.images.length > 1) {
      interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % project.images.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isHovering, project.images]);

  return (
    <div
      ref={setRef}
      className={`group relative rounded-[2rem] overflow-hidden cursor-pointer
        ${project.size === 'large' ? 'col-span-1 md:col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[4/3]'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setActiveImage(0);
      }}
    >
      {/* Image layer */}
      <div className="absolute inset-0 w-full h-full">
        {project.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${project.brandName} - ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              activeImage === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Gradient overlay — stronger on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

      {/* Slide progress track (visible on hover) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-[3] flex gap-1 px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.images.map((_, i) => (
          <div key={i} className="flex-1 h-full rounded-full overflow-hidden bg-white/20">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                activeImage === i ? 'w-full bg-white' : 'w-0 bg-white/50'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Top row — Brand logo + category (always visible, subtle) */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex items-start justify-between z-[2]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-lg bg-black/30 backdrop-blur-sm">
            <img src={project.brandLogo} alt={project.brandName} className="w-full h-full object-cover" />
          </div>
          <span className="text-white/80 text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.brandName}
          </span>
        </div>

        {/* Quick link icon */}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      {/* Bottom content — brand name, category, tech, + action links */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {/* Category pill */}
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/50 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {project.category}
        </span>

        {/* Brand Name as main heading */}
        <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
          {project.brandName}
        </h3>

        {/* Description — shown on hover if available */}
        {project.description && (
          <p className="text-sm md:text-base text-white/60 mb-4 max-w-xl leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech tags + Links row */}
        <div className="flex items-end justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {/* Technology pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-xs font-medium border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200 flex items-center gap-1.5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
                Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 flex items-center gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=80",
                end: "center center",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative z-10 bg-background py-32 px-4 sm:px-6 lg:px-12 overflow-hidden font-inter"
    >
      <div className="max-w-[1400px] mx-auto relative">

        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Section Header */}
        <div className="mb-20 md:mb-28 md:px-4">
          <h2 className="text-5xl md:text-8xl font-semibold font-firacode tracking-tighter text-text mb-6 font-inter">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]">Works.</span>
          </h2>
          <p className="text-lg md:text-2xl text-text tracking-tight font-medium font-inter max-w-2xl leading-relaxed">
            A curated collection of projects that define craft.
          </p>
        </div>

        {/* Bento-style Grid — Client Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              setRef={el => cardsRef.current[index] = el}
            />
          ))}
        </div>

        {/* University Projects Section */}
        <div className="mt-28 md:mt-40">
          <div className="mb-16 md:mb-24 md:px-4">
            <h2 className="text-4xl md:text-7xl font-semibold font-firacode tracking-tighter text-text mb-6 font-inter">
              University <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0093c0] to-[#104e69]">Projects.</span>
            </h2>
            <p className="text-lg md:text-2xl text-text tracking-tight font-medium font-inter max-w-2xl leading-relaxed">
              Academic projects that pushed creative and technical boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24">
            {universityProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                setRef={el => cardsRef.current[projects.length + index] = el}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}