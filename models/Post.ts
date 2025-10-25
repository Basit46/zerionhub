import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId;
  message: string;
  createdAt?: Date;
}

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  avatar?: string;
  message: string;
  feeling: "bullish" | "bearish" | "neutral";
  returnPercent: string;
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    feeling: {
      type: String,
      enum: ["bullish", "bearish", "neutral"],
      default: "neutral",
    },
    returnPercent: {
      type: String,
      default: "0",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
