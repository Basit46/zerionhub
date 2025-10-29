import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  try {
    const res = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/nft-collections`,
      {
        headers: {
          Authorization: `Basic ${process.env.ZERION_API_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Zerion API error: ${res.statusText}`);
    }

    const data = await res.json();
    const nftCount = data?.data?.length ?? 0;

    return NextResponse.json({ nftCount });
  } catch (error: any) {
    console.error("NFT count route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
