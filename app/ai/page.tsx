"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LucideLoaderCircle,
  LucideSendHorizonal,
  LucideSparkles,
} from "lucide-react";
import { v4 } from "uuid";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useGlobalStore } from "@/store/globalStore";
import { useActiveAccount } from "thirdweb/react";

const prompts = [
  "Give me a detailed analysis of my portfolio performance",
  "Which assets are driving most of my gains or losses?",
  "Break down my portfolio allocation across all coins",
  "Suggest how I can rebalance to improve risk and returns",
];

const CoinVistaAI = () => {
  const { prompt, setPrompt, chats, addChat, clearChats } = useGlobalStore();

  const account = useActiveAccount();

  const { data = [] } = useQuery({
    queryKey: ["assets", account?.address],
    queryFn: async () => {
      const res = await axios.get(
        `/api/zerion/wallet/${account?.address}/positions`
      );
      return res.data.data;
    },
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handlePromptClick = (text: string) => {
    handleSend(text);
  };

  const scrollToTop = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, 100);
  };

  const handleSend = (value: string) => {
    if (!value) return;

    mutate(value);
    addChat({ id: v4(), text: value, role: "user" });
    scrollToTop();
    setPrompt("");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: string) => {
      const res = await axios.post("/api/ai", {
        prompt: value,
        portfolio: data,
      });
      return res.data.data;
    },
    onSuccess: (data) => {
      addChat({ id: v4(), text: data, role: "ai" });
      scrollToTop();
    },
  });

  return (
    <div className="h-full w-full flex flex-col">
      <header className="w-full px-[20px] pt-[20px] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucideSparkles className="size-[24px]" />
          <p>AI Insights</p>
        </div>

        {chats.length > 0 && (
          <Button onClick={() => clearChats()} variant={"destructive"}>
            Clear chat
          </Button>
        )}
      </header>

      <div className="flex-1 w-full px-[30px] py-[20px] overflow-y-auto flex justify-center items-end">
        <div className="w-full md:w-[70%] h-full flex flex-col gap-y-[40px]">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex-1 overflow-auto flex flex-col scroll-smooth"
          >
            {chats?.length < 1 ? (
              <div className="mt-auto grid grid-cols-2 lg:flex justify-between gap-[20px]">
                {prompts.map((prompt, i) => (
                  <div
                    key={i}
                    onClick={() => handlePromptClick(prompt)}
                    role="button"
                    className="w-full h-[130px] sm:h-[100px] lg:h-[150px] p-[10px] border border-gray-400 rounded-[12px] flex flex-col justify-between"
                  >
                    <p className="text-gray-300">{prompt}</p>
                    <LucideSparkles className="text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 space-y-[16px]">
                {chats?.map((chat) =>
                  chat.role === "user" ? (
                    <div
                      key={chat.id}
                      className="ml-auto w-fit h-fit text-wrap max-w-[80%] px-[10px] py-[4px] rounded-[8px] break-words"
                    >
                      {chat.text}
                    </div>
                  ) : (
                    <div
                      key={chat.id}
                      className="mr-auto w-fit h-fit max-w-[80%] px-[10px] py-[4px] rounded-[8px] break-words prose prose-sm prose-invert text-white overflow-y-auto"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {chat.text}
                      </ReactMarkdown>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 w-full h-[80px] p-[8px] border border-gray-400 rounded-[12px] flex overflow-hidden">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // stop new line
                  handleSend(prompt);
                }
              }}
              className="w-full h-full bg-transparent border-none outline-none resize-none"
            ></textarea>
            <Button
              disabled={isPending}
              onClick={() => handleSend(prompt)}
              className="self-end"
            >
              {!isPending ? (
                <>
                  <LucideSendHorizonal />
                  Send
                </>
              ) : (
                <LucideLoaderCircle className="animate-spin" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinVistaAI;
