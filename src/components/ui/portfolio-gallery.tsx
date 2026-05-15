"use client";

import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { X, ExternalLink, GitBranch, Play } from "lucide-react";

const CATEGORIES = ["All", "Web Apps", "AI Projects", "E-Commerce", "Creative"] as const;
type Category = typeof CATEGORIES[number];

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  longDesc: string;
  tags: string[];
  image: string;
  accent: string;
  dot: string;
  live?: string;
  github?: string;
  demo?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "LegalNews SkipEngine Scraper",
    category: "AI Projects",
    description: "Advanced web scraping engine to extract and process legal news content with sophisticated skip patterns and data validation.",
    longDesc: "Advanced web scraping engine designed to intelligently extract and process legal news content from multiple sources. Built with Python, BeautifulSoup, Scrapy, and Selenium — featuring sophisticated skip patterns, deduplication logic, and a multi-source data validation pipeline. Development time: 6 weeks.",
    tags: ["Python", "BeautifulSoup", "Scrapy", "Selenium"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80",
    accent: "from-blue-500/10 to-violet-500/5",
    dot: "bg-blue-400",
    github: "#",
  },
  {
    id: 2,
    title: "Grand Rapids Realty Chatbot",
    category: "AI Projects",
    description: "AI-powered real estate conversational agent with NLP and property recommendation algorithms.",
    longDesc: "AI-powered conversational agent for real estate inquiries featuring natural language processing and property recommendation algorithms for enhanced customer experience. Integrates DialogFlow for NLP, TensorFlow for recommendation models, and a Flask backend API. Development time: 8 weeks.",
    tags: ["Python", "NLP", "TensorFlow", "Flask", "DialogFlow"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
    accent: "from-emerald-500/10 to-cyan-500/5",
    dot: "bg-emerald-400",
    github: "#",
  },
  {
    id: 3,
    title: "AI Video & Audio Processing Suite",
    category: "AI Projects",
    description: "Deep learning multimedia platform for automated video analysis, speech recognition, and audio enhancement.",
    longDesc: "Cutting-edge multimedia processing platform leveraging deep learning for automated video analysis, speech recognition, and audio enhancement with real-time capabilities. Built with Python, OpenCV, FFmpeg, PyTorch, and MoviePy. Supports batch processing and live streaming pipelines. Development time: 10 weeks.",
    tags: ["Python", "OpenCV", "FFmpeg", "PyTorch", "MoviePy"],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=700&q=80",
    accent: "from-pink-500/10 to-violet-500/5",
    dot: "bg-pink-400",
    github: "https://github.com/grajat510/ai_video_audio",
  },
  {
    id: 4,
    title: "MyContactBoss CRM — Proqly",
    category: "Web Apps",
    description: "Full-stack CRM with advanced contact management, lead tracking, and automated workflow capabilities.",
    longDesc: "Comprehensive Customer Relationship Management system built for Proqly (Jan 2024 – Jun 2025). Features secure authentication, automated lead management, contact tracking, and RESTful APIs. Built with Vue.js, Django, and PostgreSQL — database query optimisation delivered 40% faster load times.",
    tags: ["Vue.js", "Django", "PostgreSQL", "Python", "JavaScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    accent: "from-cyan-500/10 to-blue-500/5",
    dot: "bg-cyan-400",
    demo: "https://www.loom.com/share/5b99fbcbb8274479a0d2e6ebddae1ec0?sid=8133ee78-62c3-4529-91b9-b7505face13d",
  },
  {
    id: 5,
    title: "Interactive Data Viz Dashboard",
    category: "Web Apps",
    description: "Fully responsive analytics dashboard with dynamic charts, real-time filtering, and interactive data exploration.",
    longDesc: "Fully responsive analytics dashboard providing comprehensive insights from massive datasets with dynamic charts, real-time filtering, and interactive data exploration. Built with React, Flask, MongoDB, D3.js, and Chart.js. Handles millions of data points with smooth 60fps interactions. Development time: 5 weeks.",
    tags: ["React", "Flask", "MongoDB", "D3.js", "Chart.js"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80",
    accent: "from-amber-500/10 to-orange-500/5",
    dot: "bg-amber-400",
    github: "https://github.com/grajat510/Interactive_Visualisation_Dashboard",
  },
  {
    id: 6,
    title: "FastAPI Enterprise Backend",
    category: "Web Apps",
    description: "High-performance RESTful API with advanced query optimisation, JWT auth, and scalable microservices architecture.",
    longDesc: "High-performance RESTful API service with advanced query optimisation, secure JWT authentication, and scalable microservices architecture for enterprise applications. Built with FastAPI, PostgreSQL, Docker, and Redis for sub-10ms response times under heavy load. Development time: 4 weeks.",
    tags: ["FastAPI", "PostgreSQL", "JWT", "Docker", "Redis"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
    accent: "from-violet-500/10 to-blue-500/5",
    dot: "bg-violet-400",
    github: "https://github.com/grajat510/FastAPI_Project",
  },
  {
    id: 7,
    title: "Ivanooo E-Commerce Platform",
    category: "E-Commerce",
    description: "Modern responsive e-commerce platform with product catalogue, cart, and seamless multi-payment checkout.",
    longDesc: "Architected and developed a modern, responsive e-commerce platform for Ivanooo (Jan 2025 – Present) using Nuxt.js with advanced features including product catalogue with advanced filtering, shopping cart with persistent state, and seamless checkout. Achieved 95+ Lighthouse scores across all metrics.",
    tags: ["Nuxt.js", "WordPress", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=700&q=80",
    accent: "from-rose-500/10 to-pink-500/5",
    dot: "bg-rose-400",
    live: "#",
  },
  {
    id: 8,
    title: "Gericht Restaurant Experience",
    category: "Creative",
    description: "Elegant restaurant website with immersive UI/UX design and modern web technologies for premium dining.",
    longDesc: "Elegant and sophisticated restaurant website featuring immersive UI/UX design, responsive layouts, and modern web technologies for a premium dining establishment. Built with React, TypeScript, SCSS, and Framer Motion — delivering smooth animations and a high-end brand experience. Development time: 3 weeks.",
    tags: ["React", "TypeScript", "SCSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80",
    accent: "from-orange-500/10 to-amber-500/5",
    dot: "bg-orange-400",
    github: "https://github.com/grajat510/gericht-restaurant",
  },
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 text-[#FF7A1A] text-[10px] font-bold tracking-[0.18em] uppercase mb-5">
      <span className="w-1 h-1 rounded-full bg-[#FF7A1A] animate-pulse" />
      {children}
    </div>
  );
}

export default function PortfolioGallery() {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <section id="portfolio" className="py-20 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12 text-center">
            <SectionBadge>Portfolio</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mt-1 mb-3">Work That Speaks</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm">Real projects. Real results. Click any card for the full case study.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border ${
                  active === cat
                    ? "bg-[#1E3A73] border-[#1E3A73] text-white shadow-lg shadow-[#1E3A73]/20"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(project => (
              <div key={project.id} onClick={() => setSelected(project)}>
              <TiltCard
                tiltLimit={7}
                scale={1.02}
                effect="gravitate"
                className={`group cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br ${project.accent} bg-white dark:bg-gray-800/60 overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-900/80 via-white/10 dark:via-gray-900/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.dot}`} />
                    <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 tracking-widest uppercase">{project.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-black text-gray-900 dark:text-gray-100 text-[15px] mb-2 leading-snug">{project.title}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
            style={{ animation: "scaleIn 0.25s ease" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-56">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-900/80 via-white/10 dark:via-gray-900/10 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <X size={14} className="text-gray-700 dark:text-gray-300" />
              </button>
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selected.dot}`} />
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 tracking-widest uppercase">{selected.category}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-3">{selected.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{selected.longDesc}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selected.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 text-[10px] rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-semibold">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {selected.demo && (
                  <a href={selected.demo} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF7A1A] hover:bg-[#FF7A1A]/90 text-white text-xs font-bold transition-colors shadow-lg shadow-[#FF7A1A]/20">
                    <Play size={12} /> Watch Demo
                  </a>
                )}
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3A73] hover:bg-[#1E3A73]/90 text-white text-xs font-bold transition-colors shadow-lg shadow-[#1E3A73]/20">
                    <ExternalLink size={12} /> Live Site
                  </a>
                )}
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors">
                    <GitBranch size={12} /> GitHub
                  </a>
                )}
                <button onClick={() => setSelected(null)}
                  className="ml-auto px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-semibold transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
          `}</style>
        </div>
      )}
    </>
  );
}
