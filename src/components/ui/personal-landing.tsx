"use client"

import React, { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Video } from "lucide-react"
import { SiGithub, SiYoutube } from "react-icons/si"

const HeroSection: React.FC = () => (
  <section className="w-full flex flex-col items-center text-center gap-6">
    <div className="relative mb-2">
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7A1A] via-orange-400 to-[#1E3A73] opacity-60 blur-lg animate-glow" />
      <img
        src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Rajat"
        alt="Rajat Gupta"
        className="relative size-32 rounded-full border-4 border-zinc-800 shadow-xl z-10"
      />
    </div>
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
      Hi, I&apos;m Rajat Gupta
    </h1>
    <p className="text-xl md:text-2xl text-zinc-300 max-w-lg mx-auto font-normal">
      Founder of Nova AICode Studio — I build full-stack apps, AI products, and creative digital experiences.
    </p>
  </section>
)

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
  bg: string
  text: string
}

const socialLinks: SocialLink[] = [
  {
    href: "#",
    label: "YouTube",
    icon: <SiYoutube size={26} />,
    bg: "bg-red-500",
    text: "text-white",
  },
  {
    href: "https://github.com/grajat510",
    label: "GitHub",
    icon: <SiGithub size={26} />,
    bg: "bg-zinc-800",
    text: "text-white",
  },
  {
    href: "#",
    label: "Self Intro",
    icon: <Video size={26} />,
    bg: "bg-zinc-50",
    text: "text-zinc-900",
  },
]

const SocialsBlock: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-4 w-full">
    {socialLinks.map(link => (
      <a
        key={link.label}
        href={link.href}
        aria-label={link.label}
        className={twMerge(
          "flex items-center gap-2 rounded-full border border-zinc-700 px-7 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300",
          link.bg,
          link.text
        )}
        style={{ minWidth: 140, minHeight: 52 }}
      >
        {link.icon}
        <span>{link.label}</span>
      </a>
    ))}
  </div>
)

const AboutBlock: React.FC = () => (
  <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-lg text-center">
    <p className="text-lg md:text-xl text-zinc-200 font-normal leading-relaxed">
      5+ years delivering full-stack projects, AI integrations, and e-commerce solutions for clients worldwide.<br />
      Always building. Always shipping. Always owning the outcome.
    </p>
  </div>
)

const ConnectSection: React.FC = () => {
  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (msg: string) => {
    if (!msg.trim()) return "Message cannot be empty."
    if (msg.trim().length < 3) return "Message must be at least 3 characters."
    if (msg.length > 200) return "Message cannot exceed 200 characters."
    return ""
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate(message)
    if (err) { setError(err); return }
    setShowToast(true)
    setMessage("")
    setError("")
    if (inputRef.current) inputRef.current.blur()
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <section className="w-full flex flex-col items-center text-center gap-4 mt-4 relative">
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          Message sent!
        </div>
      )}
      <p className="text-lg text-zinc-400 max-w-md mx-auto">
        Interested in collaborating or just want to say hi? Drop a message below.
      </p>
      <form onSubmit={handleSend} className="flex w-full max-w-md gap-2 items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={e => { setMessage(e.target.value); if (error) setError("") }}
          placeholder="Type your message..."
          maxLength={201}
          className={twMerge(
            "flex-1 rounded-full border px-5 py-3 text-base text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none shadow",
            error
              ? "border-red-500 bg-zinc-900 focus:border-red-500"
              : "border-zinc-700 bg-zinc-900 focus:border-orange-400"
          )}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={twMerge(
            "inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-7 py-3 text-base font-semibold text-white shadow-lg hover:bg-[#FF7A1A]/90 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all",
            message.trim() ? "hover:scale-105 hover:shadow-xl cursor-pointer opacity-100" : "opacity-50 cursor-not-allowed"
          )}
        >
          Send
        </button>
      </form>
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
    </section>
  )
}

export const PersonalLanding: React.FC = () => (
  <div className="w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 px-6 py-20 text-zinc-50 relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF7A1A] via-orange-400 to-orange-600 opacity-15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
    <div className="w-full max-w-2xl flex flex-col items-center gap-12 z-10">
      <HeroSection />
      <AboutBlock />
      <SocialsBlock />
      <ConnectSection />
    </div>
  </div>
)
