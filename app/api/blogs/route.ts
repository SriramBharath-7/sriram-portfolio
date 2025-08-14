import { NextResponse } from "next/server";

type BlogPost = {
  id: string;
  title: string;
  url: string;
  coverImage?: string | null;
  publishedAt?: string | null;
  tags?: string[];
  excerpt?: string | null;
  source: "devto" | "medium";
};

const DEVTO_USERNAME = "sriram_bharath";
const MEDIUM_HANDLE = "@srirambharath7";

export async function GET() {
  try {
    const [devto, medium] = await Promise.all([
      fetch(`https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=50`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      })
        .then(async (r) => (r.ok ? r.json() : []))
        .then((items: any[]) =>
          (items || []).map((it) => ({
            id: it.id?.toString?.() ?? it.url,
            title: it.title,
            url: it.canonical_url || it.url,
            coverImage: it.cover_image || it.social_image || null,
            publishedAt: it.published_at || it.created_at || null,
            tags: Array.isArray(it.tag_list) ? it.tag_list : typeof it.tags === "string" ? it.tags.split(",").map((t: string) => t.trim()) : [],
            excerpt: it.description || null,
            source: "devto" as const,
          }))
        ),
      fetch(`https://medium.com/feed/${encodeURIComponent(MEDIUM_HANDLE)}`, {
        headers: {
          Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      })
        .then(async (r) => (r.ok ? r.text() : ""))
        .then((xml) => parseMediumRss(xml)),
    ]);

    // Deduplicate by normalized title or URL
    const map = new Map<string, BlogPost>();
    const normalizeTitle = (t?: string) =>
      (t || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    const normalizeUrl = (u?: string) => (u || "").replace(/\?.*$/, "").replace(/\/#.*$/, "");

    [...devto, ...medium].forEach((post) => {
      const key = normalizeUrl(post.url) || normalizeTitle(post.title);
      const titleKey = normalizeTitle(post.title);
      const existing = map.get(key) || map.get(titleKey);
      if (!existing) {
        map.set(key, post);
      } else {
        // Prefer DEV.to if duplicate titles exist (often canonical to Medium)
        if (existing.source === "medium" && post.source === "devto") {
          map.set(key, post);
        }
      }
    });

    const posts = Array.from(map.values()).sort((a, b) => {
      const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return db - da;
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ posts: [], error: "Failed to load blogs" }, { status: 200 });
  }
}

function parseMediumRss(xml: string): BlogPost[] {
  if (!xml) return [];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const posts: BlogPost[] = [];
  for (const item of items) {
    const title = textBetween(item, "<title>", "</title>");
    const url = textBetween(item, "<link>", "</link>");
    const pubDate = textBetween(item, "<pubDate>", "</pubDate>");
    const content =
      cdataBetween(item, "<content:encoded>", "</content:encoded>") ||
      cdataBetween(item, "<content>", "</content>") ||
      "";
    const coverImage = extractFirstImage(content);
    posts.push({
      id: url || title,
      title: decodeHtml(title),
      url: url?.trim() || "",
      coverImage,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
      tags: [],
      excerpt: null,
      source: "medium",
    });
  }
  return posts;
}

function textBetween(haystack: string, start: string, end: string): string | null {
  const s = haystack.indexOf(start);
  if (s === -1) return null;
  const e = haystack.indexOf(end, s + start.length);
  if (e === -1) return null;
  return haystack.substring(s + start.length, e);
}

function cdataBetween(h: string, start: string, end: string): string | null {
  const inner = textBetween(h, start, end);
  if (!inner) return null;
  const cdata = inner.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return cdata ? cdata[1] : inner;
}

function extractFirstImage(html: string | null): string | null {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}


