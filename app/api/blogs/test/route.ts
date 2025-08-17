import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "sriram_bharath";
    const response = await fetch(`https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=10`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ 
        error: `Dev.to API error: ${response.status} ${response.statusText}`,
        status: response.status 
      });
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      count: data.length,
      articles: data.map((article: any) => ({
        id: article.id,
        title: article.title,
        url: article.canonical_url || article.url,
        published_at: article.published_at,
        created_at: article.created_at,
        tags: article.tag_list
      })),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
