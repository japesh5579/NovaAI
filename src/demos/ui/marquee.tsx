"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: number;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  speed = 40,
  repeat = 1,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [trackRef, trackRef2].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--direction", reverse ? "reverse" : "normal");
    });
  }, [reverse]);

  const content = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="contents">{children}</span>
  ));

  const trackStyle = {
    animation: `marquee-scroll var(--duration, ${speed}s) linear infinite var(--direction, normal)`,
    animationPlayState: paused ? "paused" : "running",
  } as React.CSSProperties;

  return (
    <div
      className={cn("flex overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div ref={trackRef} className="flex min-w-full shrink-0 gap-[var(--gap,1rem)]" style={trackStyle}>
        {content}
      </div>
      <div ref={trackRef2} aria-hidden className="flex min-w-full shrink-0 gap-[var(--gap,1rem)]" style={trackStyle}>
        {content}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
