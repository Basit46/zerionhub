"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideWalletCards } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const AssetsCard = () => {
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

  return (
    <div className="main-card min-h-[200px] lg:min-h-fit p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideWalletCards className="size-[20px]" />
        <p>Top Holdings</p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-hidden">
        <div className="h-fit flex flex-col">
          {data?.slice(0, 3).map((item: any, i: number) => (
            <div
              key={i}
              className={`${
                i == 0
                  ? "bg-aqua-700"
                  : i === 1
                  ? "bg-[chocolate] mt-[-50px]"
                  : "bg-[tomato] mt-[-50px]"
              } w-full h-[100px] flex justify-between px-[10px] pt-[12px] text-sm rounded-[8px]`}
            >
              <div className="h-fit flex items-center gap-1">
                <Image
                  src={
                    item?.attributes?.fungible_info?.icon?.url || "/coin.png"
                  }
                  width={20}
                  height={20}
                  alt="coin"
                />
                <p className="">{item?.attributes?.fungible_info?.name}</p>
              </div>
              <p>
                {item?.attributes?.quantity?.float}{" "}
                {item?.attributes?.fungible_info?.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsCard;
