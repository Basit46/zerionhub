import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    const address = walletAddress.toLowerCase().trim();
    const user = await User.findOne({ walletAddress: address });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error("Fetch user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
