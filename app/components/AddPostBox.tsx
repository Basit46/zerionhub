"use client";

import React, { useEffect, useState } from "react";
import {
  LucideArrowDownToDot,
  LucideArrowRight,
  LucideArrowUpFromDot,
  LucideLoaderCircle,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUserPNL, useUser } from "@/libs/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const AddPostBox = () => {
  const queryClient = useQueryClient();
  const { userId } = useUser();
  const { data: pnl = 0 } = useGetUserPNL();

  const [message, setMessage] = useState("");
  const [feeling, setFeeling] = useState<"bullish" | "bearish" | "neutral">(
    "neutral"
  );
  const [returnPercent, setReturnPercent] = useState("0");
  useEffect(() => {
    setReturnPercent(pnl?.toString());
  }, [pnl]);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      userId,
      message,
      feeling,
      returnPercent,
    }: {
      userId: string;
      message: string;
      feeling: string;
      returnPercent: string;
    }) => {
      const res = await axios.post(`/api/posts`, {
        userId,
        message,
        feeling,
        returnPercent,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast("Post sent");
      setMessage("");
      setFeeling("neutral");
      setReturnPercent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) {
      toast.error("Add a message");
      return;
    }

    mutate({ userId, message, feeling, returnPercent });
  };

  return (
    <div className="px-[20px] flex gap-2 border-b border-b-gray-700 pt-[10px] pb-[20px]">
      <div className="relative size-[40px] bg-aqua-700 rounded-full">
        <Image
          src="/nft1.png"
          fill
          className="object-cover rounded-full"
          alt="user"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="w-full h-[44px] p-[2px] flex items-center justify-center bg-gradient-to-r from-[#3232DC] to-[#ff7583] rounded-lg">
          <Input
            autoFocus
            className="w-full h-full"
            placeholder="What do you feel about the market today, share your ideas here!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mt-[10px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() =>
                setFeeling((prev) =>
                  prev === "bullish" ? "neutral" : "bullish"
                )
              }
              variant={"outline"}
              className={feeling == "bullish" ? "border-aqua-500" : ""}
            >
              <p>Bullish</p>
              <LucideArrowUpFromDot />
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFeeling((prev) =>
                  prev === "bearish" ? "neutral" : "bearish"
                )
              }
              variant={"outline"}
              className={feeling == "bearish" ? "border-aqua-500" : ""}
            >
              <p>Bearish</p> <LucideArrowDownToDot />
            </Button>
          </div>

          <Button disabled={isPending}>
            {isPending ? (
              <LucideLoaderCircle className="animate-spin" />
            ) : (
              <>
                <p>Post</p>
                <LucideArrowRight />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPostBox;
