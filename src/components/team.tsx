"use client";

import { Marquee } from "@/demos/ui/marquee";
import { Sparkles, Star } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Founder, ShopCraft",
    quote: "Rajat migrated our entire WooCommerce store to Shopify in under 3 weeks. Revenue tripled within 60 days. Absolutely exceptional work.",
    stars: 5,
    accent: "from-emerald-500/10 to-cyan-500/5",
    dot: "bg-emerald-400",
    initials: "SM",
  },
  {
    name: "James Thornton",
    role: "CTO, Nova AI Dashboard",
    quote: "The LLM analytics platform he built handles 10k+ daily queries without a hitch. Clean code, great communication, delivered on time.",
    stars: 5,
    accent: "from-blue-500/10 to-cyan-500/5",
    dot: "bg-blue-400",
    initials: "JT",
  },
  {
    name: "Priya Kapoor",
    role: "Operations Lead, MediSync",
    quote: "Our patient portal went from concept to 500 daily users in 6 weeks. Real-time notifications work flawlessly. Highly recommend.",
    stars: 5,
    accent: "from-cyan-500/10 to-blue-500/5",
    dot: "bg-cyan-400",
    initials: "PK",
  },
  {
    name: "David Laurent",
    role: "YouTube Creator",
    quote: "0 to 50k subscribers in 8 months. The SEO strategy and thumbnail system Rajat built changed everything for my channel.",
    stars: 5,
    accent: "from-red-500/10 to-orange-500/5",
    dot: "bg-red-400",
    initials: "DL",
  },
  {
    name: "Maria Rodriguez",
    role: "Managing Partner, LawDesk",
    quote: "The CRM platform replaced three separate tools. Billing automation alone saves us 10 hours a week. Worth every penny.",
    stars: 5,
    accent: "from-violet-500/10 to-blue-500/5",
    dot: "bg-violet-400",
    initials: "MR",
  },
  {
    name: "Alex Wu",
    role: "Marketing Director, RankLaunch",
    quote: "3x organic traffic in four months. His Core Web Vitals work pushed us to a 98 PageSpeed score. Results speak for themselves.",
    stars: 5,
    accent: "from-amber-500/10 to-orange-500/5",
    dot: "bg-amber-400",
    initials: "AW",
  },
  {
    name: "Nina Svensson",
    role: "Event Planner, Eternal Moments",
    quote: "200+ print-ready wedding and memorial designs delivered with zero revisions needed. The attention to detail is remarkable.",
    stars: 5,
    accent: "from-rose-500/10 to-pink-500/5",
    dot: "bg-rose-400",
    initials: "NS",
  },
  {
    name: "Tom Brennan",
    role: "CEO, Reel Factory",
    quote: "The AI video pipeline generates 100+ short-form videos a month automatically. Game-changer for our content operation.",
    stars: 5,
    accent: "from-pink-500/10 to-violet-500/5",
    dot: "bg-pink-400",
    initials: "TB",
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

export default function TestimonialsMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 border-b border-gray-100">

      <svg
        className="absolute right-0 bottom-0 text-[#1E3A73]/5 pointer-events-none"
        fill="none" height="154" viewBox="0 0 460 154" width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#test-clip)">
          <path
            d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40"
          />
        </g>
        <defs>
          <clipPath id="test-clip">
            <rect fill="white" height="154" width="460" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center px-6 text-center">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7A1A] to-[#1E3A73] shadow-lg shadow-[#1E3A73]/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <SectionBadge>Testimonials</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            What Clients Say
          </h2>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Real feedback from real clients — across web apps, AI products, e-commerce, and creative work.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <Marquee className="[--gap:1.25rem]" pauseOnHover speed={45}>
            {testimonials.map((t) => (
              <TiltCard
                key={t.name}
                tiltLimit={8} scale={1.03} effect="gravitate"
                className={`w-80 shrink-0 rounded-2xl border border-gray-200 bg-gradient-to-br ${t.accent} bg-white p-6 flex flex-col gap-4 hover:border-gray-300 transition-colors duration-300`}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[12px] text-gray-600 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                  <div className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0`}
                    style={{ background: "rgba(0,0,0,0.05)" }}>
                    <span className="text-[9px] font-black text-gray-600">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 leading-none">{t.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{t.role}</p>
                  </div>
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
                </div>
              </TiltCard>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
