"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function SplashScreen() {
  const [phase, setPhase] = useState<"in" | "hold" | "fly" | "land" | "done">("in")
  const [fly, setFly] = useState({ x: 0, y: 0, scale: 1 })

  useEffect(() => {
    // Hide nav logo — we'll cross-fade it in at the end
    const logoEl = document.getElementById("nav-logo")
    if (logoEl) { logoEl.style.opacity = "0"; logoEl.style.transition = "" }

    const t1 = setTimeout(() => setPhase("hold"), 600)

    const t2 = setTimeout(() => {
      const splashEl = document.getElementById("splash-wordmark")
      const logo     = document.getElementById("nav-logo")

      if (splashEl && logo) {
        const sr = splashEl.getBoundingClientRect()
        const lr = logo.getBoundingClientRect()
        setFly({
          x:     (lr.left + lr.width  / 2) - (sr.left + sr.width  / 2),
          y:     (lr.top  + lr.height / 2) - (sr.top  + sr.height / 2),
          scale: lr.height / sr.height,
        })
      }
      setPhase("fly")
    }, 1600)

    // fly is 0.75s → land 50ms after it finishes
    const t3 = setTimeout(() => {
      setPhase("land")
      const logo = document.getElementById("nav-logo")
      if (logo) {
        logo.style.transition = "opacity 0.4s ease"
        logo.style.opacity = "1"
      }
    }, 2400)

    const t4 = setTimeout(() => setPhase("done"), 2850)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      const logo = document.getElementById("nav-logo")
      if (logo) { logo.style.opacity = "1"; logo.style.transition = "" }
    }
  }, [])

  if (phase === "done") return null

  const isFlying  = phase === "fly"
  const isLanding = phase === "land"
  const inMotion  = isFlying || isLanding

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ pointerEvents: "none" }}>

      {/* White backdrop */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: inMotion ? 0 : 1 }}
        transition={{ duration: 0.35, delay: isFlying ? 0.6 : 0 }}
      />

      {/* Wordmark — container is exactly h1 height (tagline is absolute, doesn't affect measurement) */}
      <motion.div
        id="splash-wordmark"
        className="relative select-none"
        initial={{ opacity: 0, y: 28 }}
        animate={
          isLanding
            ? { opacity: 0, x: fly.x, y: fly.y, scale: fly.scale }
            : isFlying
            ? { opacity: 1, x: fly.x, y: fly.y, scale: fly.scale }
            : phase === "in"
            ? { opacity: 0, x: 0, y: 28, scale: 1 }
            : { opacity: 1, x: 0, y: 0, scale: 1 }
        }
        transition={
          isLanding
            ? { duration: 0.4, ease: "easeOut" }
            : isFlying
            ? { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.6,  ease: [0, 0, 0.2, 1] }
        }
      >
        <h1
          className="font-semibold tracking-tight leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          <span style={{ color: "#1E3A73" }}>Nova </span>
          <span style={{ color: "#FF7A1A" }}>AI</span>
          <span style={{ color: "#1E3A73" }}>Code </span>
          <span style={{ color: "#1E3A73" }}>Studio</span>
        </h1>

        {/* Tagline — absolute so it doesn't inflate the container's measured height */}
        <motion.p
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold tracking-[0.22em] uppercase text-gray-400"
          style={{ top: "calc(100% + 1.5rem)" }}
          animate={{ opacity: inMotion || phase === "in" ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Full‑Stack · AI Integration · Creative Tech
        </motion.p>
      </motion.div>
    </div>
  )
}
