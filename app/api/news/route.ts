import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY}&q=crypto&country=us`,
      {
        // cache the response for 6 hours
        next: { revalidate: 60 * 60 * 6 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.statusText}`);
    }

    const data = await res.json();
    const news = data?.results || [];

    return NextResponse.json(news);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error getting news" }, { status: 500 });
  }
}
