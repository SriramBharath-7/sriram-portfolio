import { NextResponse } from "next/server";

const DEVTO_USERNAME = "sriram_bharath";

export async function GET() {
  try {
    console.log('Force refresh called at:', new Date().toISOString());
    
    // Fetch directly from dev.to with no caching
    const response = await fetch(`https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=50`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      },
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Dev.to API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data
    const posts = (data || []).map((article: any) => ({
      id: article.id?.toString?.() ?? article.url,
      title: article.title,
      url: article.canonical_url || article.url,
      coverImage: article.cover_image || article.social_image || null,
      publishedAt: article.published_at || article.created_at || null,
      tags: Array.isArray(article.tag_list) ? article.tag_list : [],
      excerpt: article.description || null,
      source: "devto" as const,
    }));
    
    console.log(`Force refresh: Found ${posts.length} posts`);
    if (posts.length > 0) {
      console.log('Latest post:', posts[0].title);
    }
    
    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
      timestamp: new Date().toISOString(),
      cacheBuster: Date.now().toString()
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Cache-Buster': Date.now().toString(),
        'X-Last-Modified': new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Force refresh error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      posts: [],
      timestamp: new Date().toISOString()
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
