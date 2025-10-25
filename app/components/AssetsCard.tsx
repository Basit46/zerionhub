"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideWalletCards } from "lucide-react";
import Image from "next/image";
import React from "react";

const AssetsCard = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["asset"],
    queryFn: async () => {
      const res = await axios.get("/api/zerion/fungibles");
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 6,
  });

  return (
    <div className="main-card p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideWalletCards className="size-[20px]" />
        <p>Top Holdings</p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-hidden">
        <div className="h-fit flex flex-col">
          {data.slice(0, 3).map((item: any, i: number) => (
            <div
              key={i}
              className={`${
                i == 0
                  ? "bg-aqua-600"
                  : i === 1
                  ? "bg-[chocolate] mt-[-50px]"
                  : "bg-[tomato] mt-[-50px]"
              } w-full h-[100px] flex justify-between px-[10px] pt-[12px] text-sm rounded-[8px]`}
            >
              <div className="h-fit flex items-center gap-1">
                <Image
                  src={item?.attributes?.icon?.url || null}
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
