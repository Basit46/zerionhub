import { LucideLogs } from "lucide-react";
import React from "react";

const TransactionsCard = () => {
  return (
    <div className="main-card p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideLogs className="size-[20px]" />
        <p>Transactions</p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit flex flex-col gap-[8px]">
          {Array.from({ length: 10 }).map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between pb-[4px] border-b border-b-gray-600 text-sm"
            >
              <div className="flex items-center gap-1">
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

export default TransactionsCard;
