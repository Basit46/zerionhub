import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";
import { connectDB } from "@/utils/mongodb";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { userId } = await req.json();
    const post = await Post.findById(params.id);

    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id: mongoose.Types.ObjectId) => id.toString() !== userId
      );
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error("Error liking post:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
