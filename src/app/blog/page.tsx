import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog — Nova AICode Studio",
  description: "Thoughts on full-stack development, AI integration, e-commerce, and digital strategy by Rajat Gupta.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Back to portfolio */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 font-semibold mb-12 transition-colors"
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 text-[#FF7A1A] text-[10px] font-bold tracking-[0.18em] uppercase mb-5">
            <span className="w-1 h-1 rounded-full bg-[#FF7A1A] animate-pulse" />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Thoughts &amp; Insights
          </h1>
          <p className="text-gray-500 max-w-md text-sm leading-relaxed">
            Full-stack development, AI integration, e-commerce, and digital strategy — from the studio.
          </p>
        </div>

        {/* Featured post (first) */}
        {posts[0] && (
          <Link href={`/blog/${posts[0].slug}`} className="group block mb-10">
            <article className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg hover:shadow-gray-100">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-2/5 h-56 md:h-64 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <Image
                    src={posts[0].cover}
                    alt={posts[0].title}
                    fill
                    className="object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-[10px] text-gray-400 font-semibold">
                      <span className="px-2 py-0.5 rounded-full bg-[#1E3A73]/5 border border-[#1E3A73]/10 text-[#1E3A73] font-bold">Featured</span>
                      <span>{new Date(posts[0].date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span>·</span>
                      <Clock size={10} />
                      <span>{posts[0].readTime}</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#1E3A73] transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{posts[0].description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {posts[0].tags.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-gray-100 text-gray-600 border border-gray-200 font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A1A] group-hover:gap-3 transition-all">
                    Read article <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Rest of posts */}
        {posts.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg hover:shadow-gray-100 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-400 font-semibold">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span>·</span>
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-black text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-[#1E3A73] transition-colors flex-1">
                      {post.title}
                    </h2>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-[9px] rounded-md bg-gray-100 text-gray-600 border border-gray-200 font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-sm">No posts yet. Check back soon.</p>
          </div>
        )}
      </main>
    </div>
  )
}
