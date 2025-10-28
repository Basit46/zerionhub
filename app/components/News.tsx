"use client";

import React from "react";
import { CryptoNewsArticle } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const News = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axios.get("/api/news");
      return res.data;
    },
  });

  return (
    <div className="hidden lg:flex flex-1 flex-col">
      <div className="w-full h-[56px] border-b border-b-gray-700 pt-[20px] p-[16px] flex items-center justify-between">
        <p className="font-medium">News</p>
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <div className="p-[16px] space-y-[12px]">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex justify-between gap-[12px]">
                  <div className="flex-1 space-y-[8px] flex flex-col">
                    <Skeleton className="w-[40px] h-[10px] rounded-[0px]" />
                    <Skeleton className="w-full flex-1 rounded-[0px]" />
                  </div>
                  <Skeleton className="size-[64px] rounded-[0px]" />
                </div>
              ))
            : data?.map((news: CryptoNewsArticle) => (
                <a
                  key={news.article_id}
                  href={news?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between gap-[12px]"
                >
                  <div>
                    <div className="mb-[8px] flex items-center gap-[5px]">
                      <p className="text-grey-500 text-[10px] font-semibold capitalize">
                        {news?.source_name}
                      </p>
                    </div>

                    <h1 className="text-[14px] leading-[20px] text-grey-900 font-semibold">
                      {news?.title}
                    </h1>

                    {/* <p className="mt-[4px] text-grey-500 text-[12px] line-clamp-2">
                      {news?.description}
                    </p> */}
                  </div>

                  <div className="relative size-[64px] overflow-hidden flex-shrink-0 rounded-[8px] ">
                    <Image
                      src={news?.image_url || "/crypto.jpg"}
                      alt={news?.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
};

export default News;
