"use client";

import zerionInstance from "@/libs/zerionInstance";
import { useQuery } from "@tanstack/react-query";
import { LucideWalletCards } from "lucide-react";
import Image from "next/image";
import React from "react";

const AssetsCard = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["asset"],
    queryFn: async () => {
      const res = await zerionInstance.get(
        "/fungibles/?currency=usd&page[size]=10&sort=-market_data.market_cap"
      );
      return res.data.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 6,
  });

  return (
    <div className="main-card p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideWalletCards className="size-[20px]" />
        <p>Holdings</p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit flex flex-col gap-[8px]">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between pb-[4px] border-b border-b-gray-600 text-sm"
            >
              <div className="flex items-center gap-1">
                <Image
                  src={item?.attributes?.icon?.url}
                  width={20}
                  height={20}
                  alt="coin"
                />
                <p className="">{item?.attributes?.symbol}</p>
              </div>
              <p>${item?.attributes?.market_data?.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsCard;
