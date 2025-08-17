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

// Add a simple test function to verify the API is working
async function testDevToAPI() {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=5`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });
    
    if (!response.ok) {
      console.error(`Dev.to API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`Dev.to API test: Found ${data.length} articles`);
    if (data.length > 0) {
      console.log('Latest article:', data[0].title);
    }
    return data;
  } catch (error) {
    console.error('Dev.to API test failed:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === 'true';
  
  console.log('Blog API called at:', new Date().toISOString(), forceRefresh ? '(force refresh)' : '');
  
  // Test the API first
  await testDevToAPI();
  
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

    // Deduplicate primarily by normalized title (cross-platform)
    const mapByTitle = new Map<string, BlogPost>();
    const normalizeTitle = (t?: string) =>
      (t || "")
        .toLowerCase()
        .replace(/\bcdata\b/g, " ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    [...devto, ...medium].forEach((post) => {
      const titleKey = normalizeTitle(post.title);
      const existing = mapByTitle.get(titleKey);
      if (!existing) {
        mapByTitle.set(titleKey, post);
        return;
      }
      // Resolve duplicates: prefer DEV.to; otherwise prefer newest publishedAt
      const preferNew = (a?: string | null, b?: string | null) =>
        (b ? Date.parse(b) : 0) - (a ? Date.parse(a) : 0) > 0;
      if (existing.source === "medium" && post.source === "devto") {
        mapByTitle.set(titleKey, post);
      } else if (
        existing.source === post.source &&
        preferNew(existing.publishedAt, post.publishedAt)
      ) {
        mapByTitle.set(titleKey, post);
      }
    });

    const posts = Array.from(mapByTitle.values()).sort((a, b) => {
      const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return db - da;
    });

    console.log(`Blog API: Found ${devto.length} dev.to posts, ${medium.length} medium posts, ${posts.length} total after deduplication`);
    
    return NextResponse.json({ 
      posts,
      meta: {
        devtoCount: devto.length,
        mediumCount: medium.length,
        totalCount: posts.length,
        timestamp: new Date().toISOString()
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (err) {
    console.error('Blog API error:', err);
    return NextResponse.json({ 
      posts: [], 
      error: "Failed to load blogs",
      meta: {
        error: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}

function parseMediumRss(xml: string): BlogPost[] {
  if (!xml) return [];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const posts: BlogPost[] = [];
  for (const item of items) {
    const title = cdataBetween(item, "<title>", "</title>") || textBetween(item, "<title>", "</title>");
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


