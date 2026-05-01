"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/tilt-card";

interface PricingCardProps {
  title: "Basic" | "Standard" | "Pro";
  monthlyPrice: string;
  yearlyPrice: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

interface PricingSectionProps {
  heading?: string;
  description?: string;
  plans?: PricingCardProps[];
}

const DEFAULT_PLANS: PricingCardProps[] = [
  {
    title: "Basic",
    monthlyPrice: "$499",
    yearlyPrice: "$399",
    description: "Perfect for startups & small business websites.",
    features: [
      "Landing page or marketing site",
      "Mobile-responsive design",
      "Basic on-page SEO",
      "2 revision rounds",
      "Email support",
    ],
    cta: "Get Started",
    href: "#contact",
  },
  {
    title: "Standard",
    monthlyPrice: "$1,199",
    yearlyPrice: "$899",
    description: "Best for full products with AI & e-commerce.",
    features: [
      "Full-stack MERN application",
      "AI integration (LLM / Automation)",
      "Shopify or WooCommerce setup",
      "Advanced SEO & Core Web Vitals",
      "Priority support & unlimited revisions",
    ],
    cta: "Start Project",
    href: "#contact",
    featured: true,
  },
  {
    title: "Pro",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "Ideal for large-scale enterprise projects.",
    features: [
      "Everything in Standard",
      "Custom API integrations",
      "AI video & content production",
      "Dedicated account manager",
      "Enterprise-level SLA",
    ],
    cta: "Contact Us",
    href: "#contact",
  },
];

export default function PricingSection({
  heading = "Simple, Transparent Pricing",
  description = "Retainer plans for ongoing development, AI integration, and creative digital work — monthly or save 20% yearly.",
  plans = DEFAULT_PLANS,
}: PricingSectionProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-28 border-y border-white/[0.05] bg-[#080812]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-2">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{heading}</h2>
          <p className="text-gray-500 text-sm max-w-md">{description}</p>

          {/* Billing toggle */}
          <div className="mt-3">
            <Tabs
              defaultValue="monthly"
              onValueChange={v => setBilling(v as "monthly" | "yearly")}
              className="w-[280px]"
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/[0.05] border border-white/[0.07] rounded-xl p-1 h-auto">
                <TabsTrigger
                  value="monthly"
                  className="rounded-lg text-[11px] font-bold tracking-wide text-gray-500 py-2
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-600/20"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="rounded-lg text-[11px] font-bold tracking-wide text-gray-500 py-2 flex items-center gap-1.5
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-600/20"
                >
                  Yearly
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] text-emerald-400 font-black leading-none">
                    −20%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-3">
          {plans.map(plan => (
            <PricingCard key={plan.title} plan={plan} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  billing,
}: {
  plan: PricingCardProps;
  billing: "monthly" | "yearly";
}) {
  const isCustom = plan.monthlyPrice === "Custom";
  const price = isCustom ? "Custom" : billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const period = isCustom ? "" : billing === "monthly" ? "/mo" : "/mo, billed yearly";

  return (
    <TiltCard
      tiltLimit={8} scale={1.03} effect="gravitate"
      className={cn(
        "flex flex-col rounded-2xl border p-7 text-left transition-all duration-300",
        plan.featured
          ? "border-blue-500/40 bg-[#0d0d25] shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/10 scale-[1.02]"
          : "border-white/[0.06] bg-[#0a0a18] hover:border-white/[0.12] hover:bg-[#0c0c20]"
      )}
      aria-label={`${plan.title} plan`}
    >
      {/* Plan label + badge */}
      <div className="flex items-center gap-2 mb-5">
        <Badge
          variant={plan.featured ? "default" : "secondary"}
          className={cn(
            "text-[10px] font-bold tracking-wider border-0 px-2.5",
            plan.featured
              ? "bg-blue-600 text-white"
              : "bg-white/[0.07] text-gray-400"
          )}
        >
          {plan.title}
        </Badge>
        {plan.featured && (
          <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400 uppercase tracking-widest">
            Most Popular
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-black text-white">{price}</span>
          {!isCustom && (
            <span className="text-xs text-gray-600 font-medium leading-tight">{period}</span>
          )}
        </div>
        {plan.description && (
          <p className="text-xs text-gray-600 leading-relaxed mt-2">{plan.description}</p>
        )}
      </div>

      <div className="border-t border-white/[0.06] my-5" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-2.5">
            <CircleCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" aria-hidden />
            <span className="text-sm text-gray-400 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="pt-7 mt-auto">
        <Link href={plan.href}>
          <Button
            size="sm"
            className={cn(
              "w-full font-bold h-10 rounded-xl transition-all text-sm",
              plan.featured
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-lg shadow-blue-600/20"
                : "bg-white/[0.05] hover:bg-white/[0.09] text-gray-300 border border-white/[0.08] hover:border-white/[0.15]"
            )}
          >
            {plan.cta} →
          </Button>
        </Link>
      </div>
    </TiltCard>
  );
}
