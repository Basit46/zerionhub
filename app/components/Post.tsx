"use client";

import {
  LucideBadgeCheck,
  LucideChevronDown,
  LucideLoaderCircle,
  LucideMessageCircleReply,
  LucideSendHorizonal,
  LucideThumbsUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostType } from "@/types";
import { formatLastActiveTime, truncateAddress } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/libs/hooks/useUser";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useActiveAccount } from "thirdweb/react";

const Post = ({ post }: { post: PostType }) => {
  const queryClient = useQueryClient();
  const { userId } = useUser();
  const account = useActiveAccount();

  const [showMore, setShowMore] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    setLikeCount(post?.likes?.length);
  }, [post]);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    post.likes.includes(userId) ? setIsLiked(true) : setIsLiked(false);
  }, [post]);
  const [commentMsg, setCommentMsg] = useState("");

  //Like/unlike post
  const { mutate: likeToggleMutate } = useMutation({
    mutationFn: async ({
      postId,
      userId,
    }: {
      postId: string;
      userId: string;
    }) => {
      const res = await axios.post(`/api/posts/${postId}/like`, {
        userId,
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts", account?.address] });
    },
  });

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikeCount(!isLiked ? (prev) => prev + 1 : (prev) => prev - 1);
    likeToggleMutate({ postId: post._id, userId });
  };

  //Add a comment
  const { mutate: commentMutate, isPending } = useMutation({
    mutationFn: async ({
      postId,
      userId,
      message,
    }: {
      postId: string;
      userId: string;
      message: string;
    }) => {
      const res = await axios.post(`/api/posts/${postId}/comment`, {
        userId,
        message,
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts", account?.address] });
    },
  });

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentMsg) {
      toast.error("Please, add a comment");
      return;
    }

    commentMutate({ postId: post._id, userId, message: commentMsg });
    setCommentMsg("");
  };

  return (
    <div className="p-[20px] flex gap-2 border-b border-b-gray-700">
      <div className="relative size-[40px] bg-aqua-700 rounded-full">
        <Image
          src={post?.user?.avatar || "/nft2.png"}
          fill
          className="object-cover rounded-full"
          alt="user"
        />
      </div>

      <div className="flex-1">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-[18px]">
              {truncateAddress(post?.user?.walletAddress)}{" "}
              {post?.user?.walletAddress?.toLowerCase().trim() ===
                account?.address?.toLowerCase().trim() && "(You)"}
            </p>
            <LucideBadgeCheck fill="" className="ml-1 mr-3" />
            <p className="text-gray-300 text-sm">
              {formatLastActiveTime(post?.createdAt)}
            </p>
          </div>

          <Badge
            className="px-[10px] h-[28px] rounded-full border-gray-500"
            variant={"outline"}
          >
            <p>
              <span
                className={
                  parseFloat(post.returnPercent) < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {post?.returnPercent}%
              </span>{" "}
              <span className="hidden sm:inline"> returns all time</span>
            </p>
          </Badge>
        </div>

        <div className="mt-[10px]">
          <p>{post?.message}</p>
        </div>

        <div className="mt-[16px] flex items-center justify-between">
          <div className="flex items-center gap-[40px]">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <button>
                <LucideThumbsUp
                  onClick={handleLikeToggle}
                  className={`${isLiked ? "text-aqua-500" : ""} size-[20px]`}
                />
              </button>
              <p>{likeCount?.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <LucideMessageCircleReply className="size-[20px]" />
              <p>{post?.comments?.length?.toLocaleString()}</p>

              <button onClick={() => setShowMore((prev) => !prev)}>
                <LucideChevronDown className={showMore ? "rotate-180" : ""} />
              </button>
            </div>
          </div>

          {post.feeling !== "neutral" && (
            <Badge
              variant={post.feeling == "bullish" ? "secondary" : "destructive"}
              className="w-fit capitalize"
            >
              {post?.feeling}
            </Badge>
          )}
        </div>

        {showMore && (
          <>
            <form onSubmit={handleComment} className="mt-[20px] flex gap-3">
              <Input
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
                placeholder="Reply post"
              />

              <Button disabled={isPending}>
                {isPending ? (
                  <LucideLoaderCircle className="animate-spin" />
                ) : (
                  <LucideSendHorizonal />
                )}
              </Button>
            </form>

            <div className="mt-[10px] flex flex-col gap-2">
              {post?.comments?.map((comment, i) => (
                <div
                  key={i}
                  className="flex gap-2 bg-gray-600 p-[10px] rounded-lg"
                >
                  <div className="relative size-[32px] bg-aqua-700 rounded-full">
                    <Image
                      src={comment?.user?.avatar || "/nft2.png"}
                      fill
                      className="object-cover rounded-full"
                      alt="user"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="">
                          {truncateAddress(comment?.user?.walletAddress)}
                        </p>
                        <LucideBadgeCheck fill="" className="ml-1 mr-3" />
                        <p className="text-gray-300 text-sm">
                          {formatLastActiveTime(comment?.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-[10px]">
                      <p className="text-sm">{comment?.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
