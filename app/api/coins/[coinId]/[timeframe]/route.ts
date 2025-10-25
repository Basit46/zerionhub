import { NextResponse } from "next/server";

const API_KEY = process.env.COINGECKO_API_KEY;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ coinId: string; timeframe: string }> }
) {
  const { coinId, timeframe } = await params;
  console.log(coinId, timeframe);

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${
      timeframe || "365"
    }`,
    {
      headers: {
        accept: "application/json",
        ...(API_KEY ? { "x-cg-demo-api-key": API_KEY } : {}),
      },
      next: { revalidate: 12 * 60 * 60 },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko", msg: response },
      { status: 500 }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
