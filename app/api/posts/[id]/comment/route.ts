import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/utils/mongodb";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { userId, message } = await req.json();

    if (!userId || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const post = await Post.findById(params.id);
    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    post.comments.push({ user: userId, message });
    await post.save();

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (err) {
    console.error("Error commenting:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
