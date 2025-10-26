"use client";

import { Badge } from "@/components/ui/badge";
import { truncateAddress } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideArrowRight, LucideLogs } from "lucide-react";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const TransactionsCard = () => {
  const account = useActiveAccount();

  const { data = [] } = useQuery({
    queryKey: ["transactions", account?.address],
    queryFn: async () => {
      const res = await axios.get(
        `/api/zerion/wallet/${account?.address}/transactions`
      );
      return res.data.data;
    },
  });

  return (
    <div className="main-card p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideLogs className="size-[20px]" />
        <p>Recent transactions</p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit flex flex-col gap-[8px]">
          {data?.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between pb-[4px] border-b border-b-gray-600 text-sm"
            >
              <div className="flex items-center gap-3">
                <p className="">
                  {truncateAddress(item?.attributes?.transfers[0]?.sender)}
                </p>
                <Badge variant={"secondary"} className="gap-1">
                  <LucideArrowRight className="size-[12px]" />
                </Badge>
                <p className="">
                  {truncateAddress(item?.attributes?.transfers[0]?.recipient)}
                </p>
              </div>

              <p>
                {item?.attributes?.transfers[0]?.quantity?.float}{" "}
                {item?.attributes?.transfers[0]?.fungible_info?.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
