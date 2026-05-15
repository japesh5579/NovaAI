import { getPost, getAllPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Nova AICode Studio`,
    description: post.description,
    openGraph: { images: [post.cover] },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 font-semibold mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> All posts
        </Link>

        {/* Cover */}
        <div className="relative h-72 rounded-2xl overflow-hidden mb-10 bg-gray-100 dark:bg-gray-800">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-5 text-[11px] text-gray-400 font-semibold">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">{post.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-gray-100">
          {post.tags.map(t => (
            <span key={t} className="px-2.5 py-1 text-[10px] rounded-lg bg-gray-100 text-gray-600 border border-gray-200 font-semibold">{t}</span>
          ))}
        </div>

        {/* MDX body */}
        <div className="blog-prose">
          <MDXRemote source={post.content} />
        </div>

        {/* Author footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A73] to-[#FF7A1A] flex items-center justify-center text-white font-black text-lg shrink-0">
            R
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Rajat Gupta</p>
            <p className="text-xs text-gray-400">Full-Stack Developer · AI Integration · Creative Tech</p>
          </div>
          <Link
            href="/blog"
            className="ml-auto text-xs font-bold text-[#1E3A73] hover:text-[#FF7A1A] transition-colors whitespace-nowrap"
          >
            ← More posts
          </Link>
        </div>
      </main>
    </div>
  )
}
