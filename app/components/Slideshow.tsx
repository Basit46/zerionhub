"use client";

import zerionInstance from "@/libs/zerionInstance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const Slideshow = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: async () => {
      const res = await zerionInstance.get(
        "/fungibles/?currency=usd&page[size]=100&sort=-market_data.market_cap"
      );
      return res.data.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 6,
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="scrollbar-hide slide-wrap shrink-0 relative mt-[4px] h-[50px] w-full bg-pry-700 bg-opacity-10 overflow-auto">
      <div className="slide w-fit h-full flex items-center">
        <div className="pl-[20px] shrink-0 h-full flex items-center gap-[20px]">
          {data?.map((item: any, i: number) => {
            return (
              item?.attributes?.icon?.url && (
                <div key={i} className="shrink-0 flex items-center gap-1">
                  <Image
                    src={item?.attributes?.icon?.url}
                    width={20}
                    height={20}
                    alt="Icon"
                  />
                  <p>{item?.attributes?.symbol}</p>-
                  <p>${item?.attributes?.market_data?.price?.toFixed(5)}</p>
                </div>
              )
            );
          })}
        </div>
        <div className="pl-[20px] shrink-0 h-full flex items-center gap-[20px]">
          {data?.map((item: any, i: number) => {
            return (
              item?.attributes?.icon?.url && (
                <div key={i} className="shrink-0 flex items-center gap-1">
                  <Image
                    src={item?.attributes?.icon?.url}
                    width={20}
                    height={20}
                    alt="Icon"
                  />
                  <p>{item?.attributes?.symbol}</p>-
                  <p>${item?.attributes?.market_data?.price?.toFixed(5)}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
