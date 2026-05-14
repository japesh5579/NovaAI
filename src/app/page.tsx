"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2, Server, Database, Cloud, ShoppingBag, BarChart2,
  Palette, Mail, BrainCircuit,
  CheckCircle2, Tv, Clapperboard, Film, MonitorSmartphone,
  Globe, Star, ArrowRight, Menu, X,
  Sparkles, ChevronDown, Phone, MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import GlobeHero from "@/components/globe-hero";
import { ContactCard } from "@/components/contact-card";
import { TiltCard } from "@/components/ui/tilt-card";
import PricingSection from "@/components/ui/pricing-section";
import TestimonialsMarquee from "@/components/team";
import PortfolioGallery from "@/components/ui/portfolio-gallery";
import { PersonalLanding } from "@/components/ui/personal-landing";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ─── Reveal ───────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", from = "bottom" }: {
  children: React.ReactNode; delay?: number; className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const init =
    from === "left"  ? { opacity: 0, x: -30 } :
    from === "right" ? { opacity: 0, x: 30 }  : { opacity: 0, y: 30 };
  return (
    <motion.div ref={ref} initial={init}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── Typewriter ───────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 35 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) { setDeleting(false); setIndex(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, index, words]);
  return (
    <span className="bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] bg-clip-text text-transparent">
      {displayed}<span className="animate-pulse text-[#1E3A73]">|</span>
    </span>
  );
}

// ─── Section badge ────────────────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 text-[#FF7A1A] text-[10px] font-bold tracking-[0.18em] uppercase mb-5">
      <span className="w-1 h-1 rounded-full bg-[#FF7A1A] animate-pulse" />
      {children}
    </div>
  );
}

// ─── Service card ─────────────────────────────────────────
function ServiceCard({ icon: Icon, title, description, tags, num }: {
  icon: LucideIcon; title: string; description: string;
  tags: string[]; num: string;
}) {
  return (
    <TiltCard
      tiltLimit={8}
      scale={1.03}
      effect="gravitate"
      className="group relative bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-[#1E3A73]/20 dark:hover:border-[#1E3A73]/40 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-300 flex flex-col h-full"
    >
      <span className="absolute top-5 right-5 text-[10px] font-mono text-gray-300 group-hover:text-gray-400 transition-colors select-none">{num}</span>
      <div className="w-10 h-10 rounded-xl bg-[#1E3A73]/10 border border-[#1E3A73]/20 flex items-center justify-center mb-4 group-hover:bg-[#1E3A73]/15 transition-colors shrink-0">
        <Icon size={18} className="text-[#1E3A73]" />
      </div>
      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-2 leading-snug">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium">{t}</span>
        ))}
      </div>
    </TiltCard>
  );
}

// ─── Contact form ─────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New Enquiry — Nova AICode Studio",
          from_name: "Nova Portfolio",
          to: "japeshjhatta@gmail.com",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };
  const fieldCls = "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#1E3A73]/30 focus-visible:border-[#1E3A73]/40 rounded-xl h-11";
  const labelCls = "text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400";
  if (sent) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center w-full">
      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
        <CheckCircle2 size={22} className="text-emerald-400" />
      </div>
      <div>
        <p className="font-bold text-gray-900">Message sent!</p>
        <p className="text-sm text-gray-500 mt-1">I&apos;ll reply within 24 hours.</p>
      </div>
    </motion.div>
  );
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {sendError && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          Something went wrong. Please try again or email directly.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cf-name" className={labelCls}>Name</Label>
          <Input id="cf-name" required placeholder="Your Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} className={fieldCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cf-email" className={labelCls}>Email</Label>
          <Input id="cf-email" required type="email" placeholder="your@email.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} className={fieldCls} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cf-phone" className={labelCls}>Phone</Label>
        <Input id="cf-phone" type="tel" placeholder="+91 000 000 0000" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cf-msg" className={labelCls}>Message</Label>
        <Textarea id="cf-msg" required placeholder="Tell me about your project…" value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
          className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#1E3A73]/30 focus-visible:border-[#1E3A73]/40 rounded-xl resize-none" />
      </div>
      <Button type="submit" disabled={sending}
        className="w-full h-11 bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] hover:from-[#FF7A1A]/90 hover:to-[#1E3A73]/90 text-white border-0 font-bold rounded-xl shadow-lg shadow-[#1E3A73]/20 transition-all">
        {sending
          ? <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />Sending…</>
          : "Send Message →"}
      </Button>
    </form>
  );
}

// ─── Data ─────────────────────────────────────────────────
const SERVICES = [
  { icon: Code2,        title: "Full-Stack Dev",       description: "End-to-end MERN apps, SPAs, server-rendered Next.js. Production-ready & scalable.",  tags: ["React", "Next.js", "Node", "TS"],        stackLabel: "Tech Stack", num: "01" },
  { icon: BrainCircuit, title: "AI Integration",       description: "Embed LLMs, generative AI and automation seamlessly into your product.",              tags: ["OpenAI", "LangChain", "Python", "APIs"],  stackLabel: "Tech Stack", num: "02" },
  { icon: ShoppingBag,  title: "E-Commerce & CMS",     description: "Custom Shopify stores, WordPress sites, WooCommerce & Liquid templating.",            tags: ["Shopify", "WordPress", "WooCommerce"],    stackLabel: "Platforms",  num: "03" },
  { icon: BarChart2,    title: "SEO Optimization",     description: "On-page, technical SEO, structured data, metadata, Core Web Vitals.",                 tags: ["On-Page", "Schema", "Core Web Vitals"],   stackLabel: "Focus Areas",num: "04" },
  { icon: Tv,           title: "YouTube Growth",       description: "Channel strategy, video SEO, thumbnails, analytics and content calendar.",            tags: ["Video SEO", "Thumbnails", "Analytics"],  stackLabel: "Specialties",num: "05" },
  { icon: Palette,      title: "Event Card Design",    description: "Elegant print-ready wedding invitations, memorial programs and stationery.",          tags: ["Wedding", "Memorial", "Print-ready"],    stackLabel: "Deliverables",num: "06" },
  { icon: Clapperboard, title: "AI Video Generation",  description: "AI-powered video creation with Runway, Sora, Kling, and Pika.",                       tags: ["Runway", "Sora", "Kling", "Pika"],       stackLabel: "Tools",      num: "07" },
  { icon: Film,         title: "Video Editing",        description: "Professional editing, color grading, captions for short & long-form content.",        tags: ["Premiere Pro", "DaVinci", "After Effects"], stackLabel: "Tools",   num: "08" },
];

const BLOG_POSTS = [
  {
    slug: "ai-dashboard-nextjs",
    title: "How I Built a Real-Time AI Dashboard with Next.js 14",
    date: "2025-04-12",
    description: "A deep dive into building a production AI dashboard with streaming responses, role-based access, and sub-50ms latency on Vercel Edge.",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
  },
  {
    slug: "shopify-vs-woocommerce-2025",
    title: "Shopify vs WooCommerce in 2025: A Developer's Honest Take",
    date: "2025-03-28",
    description: "After migrating 10+ stores both ways, here's the unfiltered truth about which platform wins — and when.",
    tags: ["Shopify", "E-Commerce", "WooCommerce"],
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80",
  },
  {
    slug: "youtube-growth-0-to-50k",
    title: "0 to 50K: The YouTube Growth Strategy That Actually Worked",
    date: "2025-03-10",
    description: "The exact content calendar, thumbnail formula, and SEO strategy that grew a tech channel from zero to 50,000 subscribers in 8 months.",
    tags: ["YouTube", "SEO", "Content Strategy"],
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&q=80",
  },
]

const STACK: { icon: LucideIcon; title: string; color: string; tech: string[] }[] = [
  { icon: MonitorSmartphone, title: "Frontend",        color: "text-[#1E3A73]",   tech: ["React.js", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "Bootstrap"] },
  { icon: Server,            title: "Backend",         color: "text-violet-400",  tech: ["Node.js", "Express.js", "Django", "Flask", "FastAPI", "REST API"] },
  { icon: Database,          title: "Databases",       color: "text-cyan-400",    tech: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"] },
  { icon: Cloud,             title: "Tools & DevOps",  color: "text-emerald-400", tech: ["Docker", "Redis", "Git", "Postman", "Selenium", "Vercel"] },
  { icon: ShoppingBag,       title: "E-Commerce",      color: "text-pink-400",    tech: ["Shopify", "Liquid", "WordPress", "WooCommerce", "PHP"] },
  { icon: Star,              title: "Ecosystem",       color: "text-amber-400",   tech: ["MERN Stack", "MEAN Stack", "Python", "CI/CD", "GraphQL"] },
];

// ─── Page ─────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const NAV = ["About", "Services", "Portfolio", "Blog", "Pricing", "Contact"];

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* ── Nav ───────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-700 py-3" : "py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center">

          {/* Logo */}
          <a
            href="#"
            id="nav-logo"
            className="font-semibold tracking-tight text-[28px] leading-none select-none mr-auto lg:ml-10"
          >
            <span style={{ color: "#1E3A73" }}>Nova </span>
            <span style={{ color: "#FF7A1A" }}>AI</span>
            <span style={{ color: "#1E3A73" }}>Code </span>
            <span style={{ color: "#1E3A73" }}>Studio</span>
          </a>

          {/* Desktop nav */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-7">
            {NAV.map(n => (
              <a key={n} href={n === "Blog" ? "/blog" : `#${n.toLowerCase()}`}
                className="text-[11px] tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-semibold">
                {n}
              </a>
            ))}
            <ThemeToggle variant="icon" defaultTheme="light" duration={600} buttonSize={34} />
          </motion.nav>

          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeToggle variant="icon" defaultTheme="light" duration={600} buttonSize={32} />
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-5 flex flex-col gap-4">
              {NAV.map(n => (
                <a key={n} href={n === "Blog" ? "/blog" : `#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{n}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <GlobeHero />

      {/* ══ Content sections ══════════════════════════════ */}
      <div>

        {/* Stats strip */}
        <div className="border-y border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "5+",  label: "Years Experience"   },
              { num: "50+", label: "Projects Delivered" },
              { num: "30+", label: "Happy Clients"      },
              { num: "15+", label: "Technologies"       },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] bg-clip-text text-transparent mb-1">{s.num}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] font-semibold">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── About ──────────────────────────────────────── */}
        <section id="about" className="pt-20 pb-10 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <SectionBadge>About Nova AICode Studio</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 leading-[1.1] mb-6">
                We build digital products<br />
                <span className="bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] bg-clip-text text-transparent">
                  that actually perform.
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-[15px]">
                Nova AICode Studio is a full-service creative tech agency delivering high-performance web applications,
                AI-powered products, e-commerce solutions, SEO strategies, and creative digital content — all led by{" "}
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Rajat Gupta</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-sm">
                Whether you need a high-performance web app, an AI-powered product, or a complete digital presence —
                we deliver end-to-end, on time and on brief.
              </p>
              <a href="#contact"
                className="inline-flex items-center gap-1.5 text-xs text-[#FF7A1A] hover:text-[#FF7A1A]/80 font-semibold transition-colors">
                Let&apos;s talk <ArrowRight size={12} />
              </a>
            </Reveal>
          </div>

        </section>

        {/* ── Stack + Services (combined) ─────────────────── */}
        <section id="services" className="py-20 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">

            {/* Header */}
            <Reveal className="text-center mb-12">
              <SectionBadge>Services & Stack</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mt-1 mb-3">
                What We Deliver
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
                Full-service digital solutions backed by a full-spectrum tech stack — from code to creative.
              </p>
            </Reveal>

            {/* ── Services grid with inline tech stack ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.04}>
                  <TiltCard tiltLimit={8} scale={1.03} effect="gravitate"
                    className="group flex flex-col items-center text-center bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-[#1E3A73]/25 dark:hover:border-[#1E3A73]/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors duration-300 h-full">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 mb-4 group-hover:border-[#1E3A73]/20 transition-colors shrink-0">
                      <s.icon size={22} className="text-[#1E3A73] dark:text-blue-400" />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-gray-100 text-[13px] mb-1.5 leading-snug">{s.title}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3 flex-1">{s.description}</p>
                    {/* Tech stack */}
                    <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
                      <p className="text-[8px] font-black tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-2">{s.stackLabel}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {s.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── Portfolio Gallery ──────────────────────────── */}
        <PortfolioGallery />

        {/* ── Blog ───────────────────────────────────────── */}
        <section id="blog" className="py-20 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-10 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <SectionBadge>Blog</SectionBadge>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mt-1 mb-2">From the Studio</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Practical insights on development, AI, and digital strategy.</p>
              </div>
              <a href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all shrink-0">
                All posts <ArrowRight size={12} />
              </a>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.07}>
                  <a href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 bg-white dark:bg-gray-800/60 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/40 h-full flex flex-col">
                      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-gray-900/60 to-transparent" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-black text-gray-900 dark:text-gray-100 text-[15px] leading-snug mb-2 group-hover:text-[#1E3A73] dark:group-hover:text-[#6b9ef5] transition-colors flex-1">
                          {post.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{post.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map(t => (
                            <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-semibold">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────── */}
        <TestimonialsMarquee />

        {/* ── Pricing ────────────────────────────────────── */}
        <PricingSection />

        {/* ── Contact ────────────────────────────────────── */}
        <section id="contact" className="py-20 border-t border-gray-100 dark:border-gray-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-10 text-center">
              <SectionBadge>Contact</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mt-1 mb-3">Let&apos;s Build Together</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
                For inquiries, collaborations, or partnerships — let&apos;s talk about what we can build together.
              </p>
            </Reveal>

            <Reveal>
              <ContactCard
                title="Get in Touch"
                description="Open for full-stack projects, AI integration, e-commerce, and creative digital work. I respond within 24 hours."
                contactInfo={[
                  { icon: Mail,   label: "Email",    value: "contact@nova-aicode.studio" },
                  { icon: Globe,  label: "Studio",   value: "Nova AICode Studio"          },
                  { icon: MapPin, label: "Location", value: "India — Worldwide Remote"    },
                  { icon: Phone,  label: "Response", value: "Within 24 hours"             },
                ]}
                className="rounded-2xl overflow-hidden"
                formSectionClassName="p-8"
              >
                <div className="w-full">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Send a Message</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tell me about your project and I&apos;ll get back to you.</p>
                  <ContactForm />
                </div>
              </ContactCard>
            </Reveal>
          </div>
        </section>

        {/* ── Owner card ─────────────────────────────────── */}
        <PersonalLanding />

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="bg-gray-900 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.05]">

              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-5">
                  <img src="/logo.png" alt="Nova AI Logo" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-white leading-none">NOVA</p>
                    <p className="text-[8px] tracking-[0.25em] text-gray-400 leading-none uppercase mt-0.5">AICode Studio</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Full-stack · AI · Creative digital services, worldwide.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mb-5">Navigation</p>
                <div className="space-y-3">
                  {[
                    { label: "About",    href: "#about"    },
                    { label: "Services", href: "#services" },
                    { label: "Portfolio",  href: "#portfolio" },
                    { label: "Pricing",    href: "#pricing"   },
                    { label: "Contact",    href: "#contact"   },
                  ].map(t => (
                    <a key={t.label} href={t.href}
                      className="block text-sm text-gray-400 hover:text-gray-300 transition-colors">{t.label}</a>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mb-5">Services</p>
                <div className="space-y-3">
                  {["Full-Stack Development", "AI Integration", "E-Commerce & CMS", "SEO Optimization", "Video Production", "Event Card Design"].map(t => (
                    <p key={t} className="text-sm text-gray-400">{t}</p>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mb-5">Tech Stack</p>
                <div className="space-y-3">
                  {["React · Next.js · Vue · Nuxt", "Node · Express · NestJS", "MongoDB · PostgreSQL", "AWS · Shopify · WordPress", "OpenAI · LangChain · Runway"].map(t => (
                    <p key={t} className="text-sm text-gray-400">{t}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500">© 2026 Nova AICode Studio · All rights reserved · Rajat Gupta</p>
              <p className="text-[9px] text-gray-600 uppercase tracking-[0.25em] font-bold">Full-Stack · AI · Creative</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
