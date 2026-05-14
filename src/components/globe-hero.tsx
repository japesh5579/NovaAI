"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Globe } from "@/components/ui/cobe-globe"
import {
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
} from "react-icons/si"
import type { IconType } from "react-icons"

// ── Languages ─────────────────────────────────────────────────────────────────
const PLANETS: { name: string; color: string; Icon: IconType }[] = [
  { name: "C++",        color: "#60a5fa", Icon: SiCplusplus   },
  { name: "JS",         color: "#fbbf24", Icon: SiJavascript  },
  { name: "React",      color: "#34d399", Icon: SiReact       },
  { name: "Node",       color: "#c084fc", Icon: SiNodedotjs   },
  { name: "Python",     color: "#f87171", Icon: SiPython      },
  { name: "TypeScript", color: "#818cf8", Icon: SiTypescript  },
  { name: "Next.js",    color: "#e2e8f0", Icon: SiNextdotjs   },
  { name: "SQL",        color: "#fb923c", Icon: SiPostgresql  },
]

const SPEEDS = [9, 13, 11, 16, 10, 14, 12, 15] // seconds per orbit

// ── Rotating dome mesh ────────────────────────────────────────────────────────
function DomeMesh({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = size * DPR
    canvas.height = size * DPR
    ctx.scale(DPR, DPR)

    const CX = size / 2, CY = size / 2
    const R = size * 0.32          // sphere radius
    const FOCAL = 700
    const TILT  = 0.35             // view tilt (rad)
    const N     = 64               // number of mesh nodes
    const CONN  = R * 0.44         // max connection distance
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    // Static sphere points (Fibonacci distribution)
    const base = Array.from({ length: N }, (_, i) => {
      const theta = Math.acos(1 - 2 * (i + 0.5) / N)
      const phi   = 2 * Math.PI * i / goldenRatio
      return {
        bx: R * Math.sin(theta) * Math.cos(phi),
        by: R * Math.sin(theta) * Math.sin(phi),
        bz: R * Math.cos(theta),
      }
    })

    let animId: number
    let rot = 0

    function render() {
      ctx.clearRect(0, 0, size, size)
      rot += 0.002

      // Rotate each point around Y axis then apply view tilt
      const pts = base.map(({ bx, by, bz }) => {
        const rx =  bx * Math.cos(rot) + bz * Math.sin(rot)
        const ry =  by
        const rz = -bx * Math.sin(rot) + bz * Math.cos(rot)

        const ty = ry * Math.cos(TILT) - rz * Math.sin(TILT)
        const tz = ry * Math.sin(TILT) + rz * Math.cos(TILT)

        const s  = FOCAL / (FOCAL + tz)
        // depth: 0 = back hemisphere, 1 = front hemisphere
        const depth = (tz + R) / (2 * R)
        return { sx: CX + rx * s, sy: CY + ty * s, tz, depth }
      })

      // Clip all drawing to the sphere circle so edges are perfectly round
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, R - 0.5, 0, Math.PI * 2)
      ctx.clip()

      // Draw connections (all points, back hemisphere fades out)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].sx - pts[j].sx
          const dy = pts[i].sy - pts[j].sy
          if (dx * dx + dy * dy < CONN * CONN) {
            const avgDepth = (pts[i].depth + pts[j].depth) / 2
            const alpha = 0.04 + avgDepth * 0.22
            ctx.strokeStyle = `rgba(100,140,220,${alpha.toFixed(2)})`
            ctx.lineWidth   = 0.7
            ctx.beginPath()
            ctx.moveTo(pts[i].sx, pts[i].sy)
            ctx.lineTo(pts[j].sx, pts[j].sy)
            ctx.stroke()
          }
        }
      }

      // Draw nodes sorted back-to-front
      const order = [...pts.keys()].sort((a, b) => pts[a].depth - pts[b].depth)
      for (const i of order) {
        const p = pts[i]
        const alpha = 0.08 + p.depth * 0.5
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100,140,220,${alpha.toFixed(2)})`
        ctx.fill()
      }

      ctx.restore()

      // Draw closed round boundary circle on top
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(100,140,220,0.45)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: size, height: size, zIndex: 1 }}
    />
  )
}

// ── Orbital rings + snooker-ball icons ───────────────────────────────────────
function OrbitalRings({ size }: { size: number }) {
  const cx = size / 2
  const cy = size / 2
  const rx = size * 0.43
  const ry = size * 0.13

  // Build a rotated ellipse path using SVG arc x-rotation — no container transform needed
  function ellipsePath(deg: number) {
    const rad = (deg * Math.PI) / 180
    const sx = (cx + rx * Math.cos(rad)).toFixed(2)
    const sy = (cy + rx * Math.sin(rad)).toFixed(2)
    const ex = (cx - rx * Math.cos(rad)).toFixed(2)
    const ey = (cy - rx * Math.sin(rad)).toFixed(2)
    return `M ${sx} ${sy} A ${rx} ${ry} ${deg} 1 0 ${ex} ${ey} A ${rx} ${ry} ${deg} 1 0 ${sx} ${sy}`
  }

  const sphereStyle = (color: string) => ({
    position: "absolute" as const,
    width: 40, height: 40,
    borderRadius: "50%",
    background: color,
    display: "flex", alignItems: "center", justifyContent: "center",
  })

  // Fixed starting positions spread across all 4 quadrants so globe always looks full
  // 0%=right-front, 25%=bottom, 50%=left-back, 75%=top — each ball gets a unique slice
  const START = [0, 0.13, 0.25, 0.38, 0.50, 0.63, 0.75, 0.88]

  const css = PLANETS.map((_, i) => {
    const deg   = i * 30
    const delay = -(START[i] * SPEEDS[i]).toFixed(3)
    const path  = ellipsePath(deg)
    return `
      ._ob${i}b,._ob${i}f{offset-path:path('${path}');offset-anchor:center;offset-rotate:0deg;}
      ._ob${i}b{animation:_oa${i} ${SPEEDS[i]}s linear ${delay}s infinite,_obB${i} ${SPEEDS[i]}s linear ${delay}s infinite;}
      ._ob${i}f{animation:_oa${i} ${SPEEDS[i]}s linear ${delay}s infinite,_obF${i} ${SPEEDS[i]}s linear ${delay}s infinite;}
      @keyframes _oa${i}{from{offset-distance:0%}to{offset-distance:100%}}
      @keyframes _obB${i}{0%,49.9%{opacity:0}50%,100%{opacity:1}}
      @keyframes _obF${i}{0%,49.9%{opacity:1}50%,100%{opacity:0}}
    `
  }).join("")

  return (
    <>
      {/* Ring lines — one SVG ellipse per orbit */}
      <svg
        style={{ position: "absolute", inset: 0, width: size, height: size, zIndex: 5, pointerEvents: "none", overflow: "visible" }}
        viewBox={`0 0 ${size} ${size}`}
      >
        {PLANETS.map((p, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
            fill="none" stroke={`${p.color}40`} strokeWidth="0.8"
            transform={`rotate(${i * 30} ${cx} ${cy})`} />
        ))}
      </svg>

      {/* Back layer — behind globe */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
        {PLANETS.map((p, i) => (
          <div key={`b${i}`} className={`_ob${i}b`} style={sphereStyle(p.color)}>
            <p.Icon size={18} color="rgba(255,255,255,0.95)" />
          </div>
        ))}
      </div>

      {/* Front layer — in front of globe */}
      <div style={{ position: "absolute", inset: 0, zIndex: 25 }}>
        {PLANETS.map((p, i) => (
          <div key={`f${i}`} className={`_ob${i}f`} style={sphereStyle(p.color)}>
            <p.Icon size={18} color="rgba(255,255,255,0.95)" />
          </div>
        ))}
      </div>

      <style>{css}</style>
    </>
  )
}

// ── Combined scene ────────────────────────────────────────────────────────────
function GlobeScene() {
  const SIZE = 520

  return (
    <div className="relative select-none" style={{ width: SIZE, height: SIZE }}>

      {/* 1. Dome mesh (canvas, behind everything) */}
      <DomeMesh size={SIZE} />

      {/* 2. Orbital rings + spheres (CSS 3D) */}
      <OrbitalRings size={SIZE} />

      {/* 3. Globe in the center */}
      <div
        className="absolute"
        style={{
          width: 300, height: 300,
          left: SIZE / 2 - 150,
          top:  SIZE / 2 - 150,
          zIndex: 20,
        }}
      >
        <Globe
          markerColor={[0.2, 0.5, 1]}
          baseColor={[0.88, 0.92, 1]}
          arcColor={[0.3, 0.6, 1]}
          glowColor={[0.6, 0.75, 1]}
          dark={0}
          mapBrightness={9}
          speed={0.004}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

// ── Role cycler ───────────────────────────────────────────────────────────────
const ROLES = [
  "MERN Stack Developer",
  "MEAN Stack Developer",
  "Full-Stack Developer",
  "AI Integration Expert",
  "Next.js Developer",
  "Shopify Developer",
  "React Developer",
]

function RoleCycler() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-3 justify-center lg:justify-start pt-1">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
      <div className="relative h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{    y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block text-sm font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent whitespace-nowrap"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Hero section ──────────────────────────────────────────────────────────────
export default function GlobeHero() {
  return (
    <section className="relative h-screen w-full bg-background overflow-hidden flex items-center">

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-4">

        {/* Left — text */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left lg:pl-10">

          <div className="flex flex-col gap-1 leading-none tracking-tighter mt-8">
            {[
              { word: "Build",    color: "",         cls: "text-gray-900 dark:text-white" },
              { word: "Innovate", color: "#FF7A1A",  cls: "" },
              { word: "Grow",     color: "#1E3A73",  cls: "" },
            ].map(({ word, color, cls }, i) => (
              <motion.p
                key={word}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`text-[clamp(3.5rem,10vw,7.5rem)] font-black ${cls}`}
                style={color ? { color } : undefined}
              >
                {word}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <RoleCycler />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-orange-400/20 hover:from-orange-400 hover:to-blue-500 transition-all">
              Let&apos;s Talk <ArrowRight size={14} />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
              View Services
            </a>
          </motion.div>
        </div>

        {/* Right — Globe scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="flex-1 flex items-center justify-center"
        >
          <GlobeScene />
        </motion.div>

      </div>
    </section>
  )
}
