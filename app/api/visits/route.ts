import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const hostParam = url.searchParams.get("host") || "global";
    const hostKey = hostParam.replace(/[:.]/g, "-");
    const namespace = "sriram-portfolio-analytics";

    const res = await fetch(
      `https://api.countapi.xyz/hit/${namespace}/${hostKey}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ value: null }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({ value: data?.value ?? null }, { status: 200 });
  } catch {
    return NextResponse.json({ value: null }, { status: 200 });
  }
}


