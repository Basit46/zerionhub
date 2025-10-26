import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import User from "@/models/User";
import { avatars } from "@/utils/constants";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { walletAddress } = await req.json();

    if (!walletAddress)
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );

    const address = walletAddress.toLowerCase().trim();

    let user = await User.findOne({ walletAddress: address });

    const used = await User.find().distinct("avatar");
    const available = avatars.filter((a) => !used.includes(a));

    const avatar =
      available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : avatars[Math.floor(Math.random() * avatars.length)];

    if (!user) {
      user = await User.create({
        walletAddress: address,
        following: [],
        followers: [],
        avatar,
      });
    }

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
