"use client";

import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { X, ExternalLink, GitBranch } from "lucide-react";

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
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nova AI Dashboard",
    category: "AI Projects",
    description: "Real-time LLM analytics platform with role-based access and OpenAI GPT-4 integration.",
    longDesc: "Built with Next.js 14 App Router, this AI-powered dashboard processes 10k+ daily queries. Features include real-time streaming responses, role-based access control, MongoDB Atlas vector search, and Vercel Edge deployment for sub-50ms latency worldwide.",
    tags: ["Next.js", "OpenAI", "MongoDB", "Vercel", "TypeScript"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80",
    accent: "from-blue-500/25 to-violet-500/10",
    dot: "bg-blue-400",
    live: "#",
    github: "#",
  },
  {
    id: 2,
    title: "ShopCraft E-Commerce",
    category: "E-Commerce",
    description: "Custom Shopify storefront with Liquid theming, WooCommerce migration, and SEO optimisation.",
    longDesc: "Complete e-commerce solution migrated from WooCommerce to Shopify. Custom Liquid theme built from scratch with 98 PageSpeed score, structured data for product rich snippets, automated email flows via Klaviyo, and 3× revenue growth in 60 days post-launch.",
    tags: ["Shopify", "Liquid", "WooCommerce", "SEO", "Klaviyo"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=700&q=80",
    accent: "from-emerald-500/25 to-cyan-500/10",
    dot: "bg-emerald-400",
    live: "#",
  },
  {
    id: 3,
    title: "MediSync Patient Portal",
    category: "Web Apps",
    description: "Full-stack MERN appointment booking with AWS S3, real-time notifications, and REST API.",
    longDesc: "Healthcare appointment system serving 500+ daily users. Built on the MERN stack with Socket.io real-time notifications, AWS S3 for document uploads, JWT auth with refresh tokens, and a Node.js/Express REST API. Deployed on AWS EC2 with CI/CD via GitHub Actions.",
    tags: ["React", "Node.js", "MongoDB", "AWS", "Socket.io"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
    accent: "from-cyan-500/25 to-blue-500/10",
    dot: "bg-cyan-400",
    live: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Reel Factory — AI Video",
    category: "AI Projects",
    description: "Automated short-form content pipeline using Runway, Kling, and Pika with AI voiceover.",
    longDesc: "End-to-end AI video production workflow generating 100+ videos/month. Integrates Runway Gen-3 for video synthesis, Kling for motion, Pika for effects, ElevenLabs for voiceover, and a Python orchestration layer for automated publishing to YouTube Shorts and Instagram Reels.",
    tags: ["Runway AI", "Kling", "Pika", "ElevenLabs", "Python"],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=700&q=80",
    accent: "from-pink-500/25 to-violet-500/10",
    dot: "bg-pink-400",
    live: "#",
  },
  {
    id: 5,
    title: "RankLaunch SEO Suite",
    category: "Web Apps",
    description: "Technical SEO audit platform with Core Web Vitals monitoring and structured data tools.",
    longDesc: "SaaS SEO tool that achieved 3× organic traffic growth for 20+ clients. Features automated technical audits, Core Web Vitals CI/CD integration, JSON-LD structured data generator, Google Search Console API sync, and a Next.js dashboard with weekly PDF reports.",
    tags: ["Next.js", "GSC API", "Schema.org", "PageSpeed", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    accent: "from-amber-500/25 to-orange-500/10",
    dot: "bg-amber-400",
    live: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Eternal Moments — Cards",
    category: "Creative",
    description: "Premium print-ready wedding invitations and memorial programs with foil variants.",
    longDesc: "High-end stationery design studio delivering 200+ print-ready designs globally. Each piece is crafted in Figma with CMYK color profiles, bleed marks, and foil/emboss layer variants. Formats include wedding invitations, memorial programs, save-the-dates, and event menus — all export-ready for professional printers.",
    tags: ["Figma", "Print Design", "CMYK", "Illustrator", "Typography"],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80",
    accent: "from-rose-500/25 to-pink-500/10",
    dot: "bg-rose-400",
  },
  {
    id: 7,
    title: "YouTube Growth Engine",
    category: "Creative",
    description: "End-to-end YouTube strategy: SEO titles, thumbnail A/B tests, and analytics dashboards.",
    longDesc: "Full-service YouTube channel management for a tech creator. Delivered 0 → 50k subscribers in 8 months. Scope includes keyword-researched titles and descriptions, thumbnail A/B testing with CTR tracking, content calendar, YouTube Studio analytics integration, and community post strategy.",
    tags: ["Video SEO", "Thumbnails", "Analytics", "YT Studio", "Canva"],
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&q=80",
    accent: "from-red-500/25 to-orange-500/10",
    dot: "bg-red-400",
    live: "#",
  },
  {
    id: 8,
    title: "LawDesk CRM Platform",
    category: "Web Apps",
    description: "NestJS + PostgreSQL CRM for a law firm with document management and billing automation.",
    longDesc: "Enterprise CRM tailored for a mid-size law firm. Built on NestJS with TypeORM and PostgreSQL, featuring client intake forms, matter management, document version control (AWS S3), automated billing with Stripe, role-based permissions, and a React admin dashboard with audit logs.",
    tags: ["NestJS", "PostgreSQL", "React", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80",
    accent: "from-violet-500/25 to-blue-500/10",
    dot: "bg-violet-400",
    live: "#",
    github: "#",
  },
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-5">
      <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
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
      <section id="portfolio" className="py-20 border-b border-white/[0.05] bg-[#080812]">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12 text-center">
            <SectionBadge>Portfolio</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-1 mb-3">Work That Speaks</h2>
            <p className="text-gray-500 max-w-sm mx-auto text-sm">Real projects. Real results. Click any card for the full case study.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border ${
                  active === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white/[0.04] border-white/[0.08] text-gray-500 hover:border-white/[0.15] hover:text-gray-300"
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
                className={`group cursor-pointer rounded-2xl border border-white/[0.07] bg-gradient-to-br ${project.accent} bg-[#0a0a18] overflow-hidden hover:border-white/[0.15] transition-colors duration-300`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a18] via-[#0a0a18]/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.dot}`} />
                    <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">{project.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-black text-white text-[15px] mb-2 leading-snug">{project.title}</h3>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-white/[0.04] text-gray-500 border border-white/[0.05] font-semibold">{t}</span>
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0d0d22] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
            style={{ animation: "scaleIn 0.25s ease" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-56">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d22] via-[#0d0d22]/20 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selected.dot}`} />
                <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">{selected.category}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-white mb-3">{selected.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{selected.longDesc}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selected.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 text-[10px] rounded-lg bg-white/[0.05] text-gray-400 border border-white/[0.07] font-semibold">{t}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg shadow-blue-600/20">
                    <ExternalLink size={12} /> Live Preview
                  </a>
                )}
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs font-bold transition-colors">
                    <GitBranch size={12} /> GitHub
                  </a>
                )}
                <button onClick={() => setSelected(null)}
                  className="ml-auto px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-gray-500 text-xs font-semibold transition-colors">
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
