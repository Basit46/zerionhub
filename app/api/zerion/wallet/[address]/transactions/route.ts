import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  try {
    const res = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/transactions/?currency=usd&page[size]=100&filter[trash]=no_filter`,
      {
        headers: {
          Authorization: `Basic ${process.env.ZERION_API_KEY}`,
          Accept: "application/json",
          ...(process.env.NODE_ENV === "development" && { "X-Env": "testnet" }),
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Zerion API error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("PNL route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
