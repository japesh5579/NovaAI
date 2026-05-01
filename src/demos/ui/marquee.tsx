"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  speed = 40,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const style = track.style as CSSStyleDeclaration & { [key: string]: string };
    style.setProperty("--duration", `${speed}s`);
    style.setProperty("--direction", reverse ? "reverse" : "normal");
  }, [speed, reverse]);

  return (
    <div
      className={cn("flex overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex min-w-full shrink-0 gap-[var(--gap,1rem)]"
        style={{
          animation: `marquee-scroll var(--duration, 40s) linear infinite var(--direction, normal)`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex min-w-full shrink-0 gap-[var(--gap,1rem)]"
        style={{
          animation: `marquee-scroll var(--duration, 40s) linear infinite var(--direction, normal)`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
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
