import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Simple blog API called at:', new Date().toISOString());
    
    const DEVTO_USERNAME = "sriram_bharath";
    const MEDIUM_HANDLE = "@srirambharath7";
    
    // Fetch from both dev.to and Medium
    console.log('Fetching from dev.to and Medium...');
    
    const [devtoResponse, mediumResponse] = await Promise.allSettled([
      fetch(`https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=20`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      }),
      fetch(`https://medium.com/feed/${encodeURIComponent(MEDIUM_HANDLE)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      })
    ]);
    
    // Process dev.to posts
    let devtoPosts = [];
    if (devtoResponse.status === 'fulfilled' && devtoResponse.value.ok) {
      const devtoData = await devtoResponse.value.json();
      devtoPosts = devtoData.map((article: any) => ({
        id: article.id?.toString() || article.url,
        title: article.title || 'Untitled',
        url: article.canonical_url || article.url || '#',
        coverImage: article.cover_image || article.social_image || null,
        publishedAt: article.published_at || article.created_at || null,
        tags: Array.isArray(article.tag_list) ? article.tag_list : [],
        excerpt: article.description || null,
        source: "devto"
      }));
      console.log('Dev.to posts:', devtoPosts.length);
    } else {
      console.log('Dev.to fetch failed:', devtoResponse.status === 'rejected' ? devtoResponse.reason : 'HTTP error');
    }
    
    // Process Medium posts
    let mediumPosts = [];
    if (mediumResponse.status === 'fulfilled' && mediumResponse.value.ok) {
      const mediumXml = await mediumResponse.value.text();
      mediumPosts = parseMediumRss(mediumXml);
      console.log('Medium posts:', mediumPosts.length);
    } else {
      console.log('Medium fetch failed:', mediumResponse.status === 'rejected' ? mediumResponse.reason : 'HTTP error');
    }
    
    // Deduplicate posts
    const allPosts = [...devtoPosts, ...mediumPosts];
    const deduplicatedPosts = deduplicatePosts(allPosts);
    
    console.log(`Total posts: ${allPosts.length}, After deduplication: ${deduplicatedPosts.length}`);
    
    return NextResponse.json({
      success: true,
      posts: deduplicatedPosts,
      count: deduplicatedPosts.length,
      timestamp: new Date().toISOString(),
      debug: {
        devtoCount: devtoPosts.length,
        mediumCount: mediumPosts.length,
        totalCount: allPosts.length,
        deduplicatedCount: deduplicatedPosts.length
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Timestamp': Date.now().toString()
      }
    });
    
  } catch (error) {
    console.error('Simple blog API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      posts: [],
      timestamp: new Date().toISOString(),
      debug: {
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
         });
   }
 }

// Helper function to parse Medium RSS
function parseMediumRss(xml: string): any[] {
  if (!xml) return [];
  
  try {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    const posts = [];
    
    for (const item of items) {
      const title = extractText(item, "<title>", "</title>");
      const url = extractText(item, "<link>", "</link>");
      const pubDate = extractText(item, "<pubDate>", "</pubDate>");
      const content = extractText(item, "<content:encoded>", "</content:encoded>") || extractText(item, "<content>", "</content>") || "";
      const coverImage = extractFirstImage(content);
      
      if (title && url) {
        posts.push({
          id: url,
          title: decodeHtml(title),
          url: url.trim(),
          coverImage,
          publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
          tags: [],
          excerpt: null,
          source: "medium"
        });
      }
    }
    
    return posts;
  } catch (error) {
    console.error('Medium RSS parsing error:', error);
    return [];
  }
}

// Helper function to extract text between tags
function extractText(haystack: string, start: string, end: string): string | null {
  const s = haystack.indexOf(start);
  if (s === -1) return null;
  const e = haystack.indexOf(end, s + start.length);
  if (e === -1) return null;
  return haystack.substring(s + start.length, e);
}

// Helper function to extract first image from HTML
function extractFirstImage(html: string): string | null {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

// Helper function to decode HTML entities
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Helper function to deduplicate posts
function deduplicatePosts(posts: any[]): any[] {
  const mapByTitle = new Map();
  
  // Normalize title for comparison
  const normalizeTitle = (title: string) => 
    title.toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  
  posts.forEach((post) => {
    const titleKey = normalizeTitle(post.title);
    const existing = mapByTitle.get(titleKey);
    
    if (!existing) {
      mapByTitle.set(titleKey, post);
      return;
    }
    
    // Resolve duplicates: prefer dev.to over Medium, otherwise prefer newer
    const preferNew = (a: string | null, b: string | null) =>
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
  
  // Convert back to array and sort by date
  const result = Array.from(mapByTitle.values()).sort((a, b) => {
    const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return db - da;
  });
  
  return result;
}
