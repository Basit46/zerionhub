import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.zerion.io/v1/fungibles/?currency=usd&page[size]=100&sort=-market_data.market_cap",
      {
        headers: {
          Authorization: `Basic ${process.env.ZERION_API_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Zerion API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error: any) {
    console.error("Fungibles route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
