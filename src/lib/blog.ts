import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  cover: string
  readTime: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".mdx"))
    .map(f => {
      const slug = f.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8")
      const { data } = matter(raw)
      return { slug, ...(data as Omit<PostMeta, "slug">) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { slug, ...(data as Omit<PostMeta, "slug">), content }
}
