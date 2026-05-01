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
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { ContactCard } from "@/components/contact-card";
import { TiltCard } from "@/components/ui/tilt-card";
import PricingSection from "@/components/ui/pricing-section";
import TestimonialsMarquee from "@/components/team";
import PortfolioGallery from "@/components/ui/portfolio-gallery";
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
    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {displayed}<span className="animate-pulse text-blue-400">|</span>
    </span>
  );
}

// ─── Section badge ────────────────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-5">
      <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
      {children}
    </div>
  );
}

// ─── Service card ─────────────────────────────────────────
function ServiceCard({ icon: Icon, title, description, tags, num }: {
  icon: React.ElementType; title: string; description: string;
  tags: string[]; num: string;
}) {
  return (
    <TiltCard
      tiltLimit={8}
      scale={1.03}
      effect="gravitate"
      className="group relative bg-[#0a0a18] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/25 hover:bg-[#0c0c20] transition-colors duration-300 flex flex-col h-full"
    >
      <span className="absolute top-5 right-5 text-[10px] font-mono text-white/[0.08] group-hover:text-white/[0.15] transition-colors select-none">{num}</span>
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/[0.15] flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors shrink-0">
        <Icon size={18} className="text-blue-400" />
      </div>
      <h3 className="font-bold text-white text-sm mb-2 leading-snug">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-white/[0.04] text-gray-500 border border-white/[0.05] font-medium">{t}</span>
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
  const fieldCls = "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-700 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/40 rounded-xl h-11";
  const labelCls = "text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500";
  if (sent) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center w-full">
      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
        <CheckCircle2 size={22} className="text-emerald-400" />
      </div>
      <div>
        <p className="font-bold text-white">Message sent!</p>
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
          className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-700 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/40 rounded-xl resize-none" />
      </div>
      <Button type="submit" disabled={sending}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
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
  { icon: Code2,        title: "Full-Stack Dev",       description: "End-to-end MERN apps, SPAs, server-rendered Next.js. Production-ready & scalable.",  tags: ["React", "Next.js", "Node", "TS"],      num: "01" },
  { icon: BrainCircuit, title: "AI Integration",       description: "Embed LLMs, generative AI and automation seamlessly into your product.",              tags: ["OpenAI", "LangChain", "Runway"],       num: "02" },
  { icon: ShoppingBag,  title: "E-Commerce & CMS",     description: "Custom Shopify stores, WordPress sites, WooCommerce & Liquid templating.",            tags: ["Shopify", "WordPress", "WooCommerce"], num: "03" },
  { icon: BarChart2,    title: "SEO Optimization",     description: "On-page, technical SEO, structured data, metadata, Core Web Vitals.",                 tags: ["Tech SEO", "Schema", "Speed"],         num: "04" },
  { icon: Tv,           title: "YouTube Growth",       description: "Channel strategy, video SEO, thumbnails, analytics and content calendar.",            tags: ["Video SEO", "Thumbnails", "Analytics"],num: "05" },
  { icon: Palette,      title: "Event Card Design",    description: "Elegant print-ready wedding invitations, memorial programs and stationery.",          tags: ["Wedding", "Memorial", "Print-ready"],  num: "06" },
  { icon: Clapperboard, title: "AI Video Generation",  description: "AI-powered video creation with Runway, Sora, Kling, and Pika.",                       tags: ["Runway", "Sora", "Kling", "Pika"],    num: "07" },
  { icon: Film,         title: "Video Editing",        description: "Professional editing, color grading, captions for short & long-form content.",        tags: ["Color Grading", "Reels", "Captions"], num: "08" },
];

const STACK = [
  { icon: MonitorSmartphone, title: "Frontend",        color: "text-blue-400",    tech: ["React.js", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"] },
  { icon: Server,            title: "Backend",         color: "text-violet-400",  tech: ["Node.js", "Express.js", "NestJS", "Django", "FastAPI", "REST API"] },
  { icon: Database,          title: "Databases",       color: "text-cyan-400",    tech: ["MongoDB", "PostgreSQL", "MySQL"] },
  { icon: Cloud,             title: "Cloud & DevOps",  color: "text-emerald-400", tech: ["AWS S3", "AWS EC2", "Lambda", "Postman", "Vercel"] },
  { icon: ShoppingBag,       title: "E-Commerce",      color: "text-pink-400",    tech: ["Shopify", "Liquid", "WordPress", "WooCommerce"] },
  { icon: Star,              title: "Ecosystem",       color: "text-amber-400",   tech: ["MERN Stack", "Git", "CI/CD", "REST", "GraphQL"] },
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

  const NAV = ["About", "Stack", "Services", "Portfolio", "Pricing", "Contact"];

  return (
    <div className="bg-[#07070f] text-white min-h-screen">

      {/* ── Nav ───────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#07070f]/90 backdrop-blur-2xl border-b border-white/[0.06] py-3" : "py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          {/* Logo */}
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }} className="flex items-center gap-2.5 mr-auto shrink-0">
            <img src="/logo.png" alt="Nova AI Logo" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <p className="text-[12px] font-black tracking-widest text-white leading-none">NOVA</p>
              <p className="text-[8px] tracking-[0.25em] text-gray-500 leading-none uppercase mt-0.5">AICode Studio</p>
            </div>
          </motion.a>

          {/* Desktop nav */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-7 ml-auto">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`}
                className="text-[11px] tracking-[0.15em] uppercase text-gray-500 hover:text-white transition-colors duration-200 font-semibold">
                {n}
              </a>
            ))}
          </motion.nav>

          <button className="md:hidden text-gray-500 hover:text-white ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="md:hidden bg-[#07070f] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4">
              {NAV.map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{n}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══ HERO — sticky scroll spacer ════════════════════ */}
      <section className="relative bg-[#07070f]" style={{ height: "calc(100vh + 3000px)" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.07), transparent 70%)" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(6,182,212,0.05), transparent 70%)" }} />

          {/* Animation */}
          <div className="absolute inset-0 z-10 translate-y-0"><IntroAnimation /></div>

          {/* Top fade — hides animation behind navbar */}
          <div className="absolute top-0 inset-x-0 h-24 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #07070f 0%, transparent 100%)" }} />

          {/* Name overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <div className="flex flex-col items-center translate-y-0">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-7xl sm:text-8xl md:text-[112px] font-black tracking-tighter leading-[0.88] text-white">
                Rajat<br />Gupta
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
                className="text-[9px] tracking-[0.55em] text-white/35 uppercase mt-5 font-semibold">
                Nova AICode Studio
              </motion.p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 inset-x-0 z-30 px-8 pb-5 flex items-end justify-between">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }} className="text-xl md:text-2xl font-bold">
              <Typewriter words={["Full-Stack Developer", "MERN Expert", "Creative Tech Studio"]} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold tracking-wide">Open for Projects</span>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5">
            <span className="text-[8px] tracking-[0.35em] text-white/20 uppercase font-semibold">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
              <ChevronDown size={13} className="text-white/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ Content sections ══════════════════════════════ */}
      <div>

        {/* Stats strip */}
        <div className="border-y border-white/[0.06] bg-[#09091a]">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "5+",  label: "Years Experience"   },
              { num: "50+", label: "Projects Delivered" },
              { num: "30+", label: "Happy Clients"      },
              { num: "15+", label: "Technologies"       },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">{s.num}</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.15em] font-semibold">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── About ──────────────────────────────────────── */}
        <section id="about" className="pt-20 pb-10 border-b border-white/[0.05]">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <SectionBadge>About Nova AICode Studio</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6">
                We build digital products<br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  that actually perform.
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-[15px]">
                Nova AICode Studio is a full-service creative tech agency delivering high-performance web applications,
                AI-powered products, e-commerce solutions, SEO strategies, and creative digital content — all led by{" "}
                <span className="text-white font-semibold">Rajat Gupta</span>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                Whether you need a high-performance web app, an AI-powered product, or a complete digital presence —
                we deliver end-to-end, on time and on brief.
              </p>
              <a href="#contact"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Let&apos;s talk <ArrowRight size={12} />
              </a>

              {/* Highlight grid */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                {[
                  { num: "5+",  label: "Years of Experience",  sub: "Full-stack & creative"    },
                  { num: "50+", label: "Projects Delivered",   sub: "On time, on brief"         },
                  { num: "8",   label: "Services Offered",     sub: "Code to creative"          },
                ].map(item => (
                  <TiltCard key={item.label} tiltLimit={10} scale={1.04} effect="gravitate"
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center hover:border-white/[0.1] transition-colors">
                    <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">{item.num}</p>
                    <p className="text-[11px] font-bold text-white mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-gray-600">{item.sub}</p>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>

        </section>

        {/* ── Stack ──────────────────────────────────────── */}
        <section id="stack" className="py-20 border-b border-white/[0.05] bg-[#080812]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-10">
              <SectionBadge>Tech Stack</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-1 mb-3">Full-Spectrum Expertise</h2>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">From pixel to production — every layer of the stack covered.</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STACK.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.07}>
                  <TiltCard
                    tiltLimit={8}
                    scale={1.03}
                    effect="gravitate"
                    className="group bg-[#0a0a18] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-[#0d0d22] transition-colors duration-300 h-full"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                        <s.icon size={16} className={s.color} />
                      </div>
                      <h3 className="font-bold text-white text-sm tracking-wide">{s.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tech.map(t => (
                        <span key={t} className="px-2.5 py-1 text-[11px] rounded-lg bg-white/[0.04] border border-white/[0.05] text-gray-400 font-medium">{t}</span>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────── */}
        <section id="services" className="py-20 border-b border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-10 text-center">
              <SectionBadge>Services</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-1 mb-3">What We Deliver</h2>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">Full-service digital solutions — from code to creative, strategy to execution.</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.04}>
                  <ServiceCard {...s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio Gallery ──────────────────────────── */}
        <PortfolioGallery />

        {/* ── Testimonials ───────────────────────────────── */}
        <TestimonialsMarquee />

        {/* ── Pricing ────────────────────────────────────── */}
        <PricingSection />

        {/* ── Contact ────────────────────────────────────── */}
        <section id="contact" className="py-20 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-10 text-center">
              <SectionBadge>Contact</SectionBadge>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-1 mb-3">Let&apos;s Build Together</h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm">
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
                  <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
                  <p className="text-sm text-gray-500 mb-6">Tell me about your project and I&apos;ll get back to you.</p>
                  <ContactForm />
                </div>
              </ContactCard>
            </Reveal>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="bg-[#05050d] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.05]">

              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-5">
                  <img src="/logo.png" alt="Nova AI Logo" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-white leading-none">NOVA</p>
                    <p className="text-[8px] tracking-[0.25em] text-gray-600 leading-none uppercase mt-0.5">AICode Studio</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Full-stack · AI · Creative digital services, worldwide.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.25em] mb-5">Navigation</p>
                <div className="space-y-3">
                  {[
                    { label: "About",      href: "#about"     },
                    { label: "Tech Stack", href: "#stack"     },
                    { label: "Services",   href: "#services"  },
                    { label: "Portfolio",  href: "#portfolio" },
                    { label: "Pricing",    href: "#pricing"   },
                    { label: "Contact",    href: "#contact"   },
                  ].map(t => (
                    <a key={t.label} href={t.href}
                      className="block text-sm text-gray-600 hover:text-gray-300 transition-colors">{t.label}</a>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.25em] mb-5">Services</p>
                <div className="space-y-3">
                  {["Full-Stack Development", "AI Integration", "E-Commerce & CMS", "SEO Optimization", "Video Production", "Event Card Design"].map(t => (
                    <p key={t} className="text-sm text-gray-600">{t}</p>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div>
                <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.25em] mb-5">Tech Stack</p>
                <div className="space-y-3">
                  {["React · Next.js · Vue · Nuxt", "Node · Express · NestJS", "MongoDB · PostgreSQL", "AWS · Shopify · WordPress", "OpenAI · LangChain · Runway"].map(t => (
                    <p key={t} className="text-sm text-gray-600">{t}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-700">© 2026 Nova AICode Studio · All rights reserved · Rajat Gupta</p>
              <p className="text-[9px] text-gray-800 uppercase tracking-[0.25em] font-bold">Full-Stack · AI · Creative</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
