import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Nova, the AI assistant for Nova AICode Studio — a full-service creative tech agency founded by Rajat Gupta with 5+ years of experience.

You help website visitors learn about our services, get pricing guidance, and decide if we're the right fit for their project.

Our services:
1. Full-Stack Development — React, Next.js, Node.js, TypeScript. End-to-end web apps, SPAs, server-rendered apps.
2. AI Integration — Embedding LLMs, OpenAI, LangChain, automation pipelines into products.
3. E-Commerce & CMS — Shopify, WordPress, WooCommerce, custom stores.
4. SEO Optimization — Technical SEO, structured data, Core Web Vitals, on-page SEO.
5. YouTube Growth — Channel strategy, video SEO, thumbnails, analytics.
6. Event Card Design — Wedding invitations, memorial programs, print-ready stationery.
7. AI Video Generation — Runway, Sora, Kling, Pika-powered videos.
8. Video Editing — Professional editing, color grading, reels, captions.

Key facts:
- 50+ projects delivered, 30+ happy clients, 15+ technologies
- Contact: use the contact form on the website or email japeshjhatta@gmail.com
- Pricing: available in the Pricing section of the website

Personality: Friendly, confident, concise. Keep replies short (2-4 sentences max unless they ask for detail). Always offer to help them take the next step. Never make up prices or timelines you're not sure about — direct them to the contact form for quotes.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(messages as { role: string; content: string }[]).filter(
            (m, i) => !(i === 0 && m.role === "assistant")
          ),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Groq API error:", JSON.stringify(err));
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
