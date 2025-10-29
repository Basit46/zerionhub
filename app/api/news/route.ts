// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch(
//       `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY}&q=crypto&country=us`,
//       {
//         // cache the response for 6 hours
//         next: { revalidate: 60 * 60 * 6 },
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch news: ${res.statusText}`);
//     }

//     const data = await res.json();
//     const news = data?.results || [];

//     return NextResponse.json(news);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error getting news" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

async function isImageValid(url: string) {
  try {
    const head = await fetch(url, { method: "HEAD" });
    return head.ok && head.headers.get("content-type")?.startsWith("image/");
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY}&q=crypto&country=us`,
      {
        next: { revalidate: 60 * 60 * 6 }, // cache for 6 hours
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.statusText}`);
    }

    const data = await res.json();
    const news = data?.results || [];

    // ✅ Check all image URLs in parallel
    const validated = await Promise.all(
      news.map(async (item: any) => {
        if (
          item.image_url &&
          typeof item.image_url === "string" &&
          item.image_url.startsWith("http")
        ) {
          const valid = await isImageValid(item.image_url);
          return valid ? item : null;
        }
        return null;
      })
    );

    // Filter out null (invalid image) entries
    const validNews = validated.filter(Boolean);

    return NextResponse.json(validNews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error getting news" }, { status: 500 });
  }
}
