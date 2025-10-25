import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/utils/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId, message, feeling, returnPercent } = await req.json();

    if (!userId || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const post = await Post.create({
      user: userId,
      message,
      feeling,
      returnPercent,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find()
      .populate("user", "walletAddress avatar")
      .populate("comments.user", "walletAddress avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
