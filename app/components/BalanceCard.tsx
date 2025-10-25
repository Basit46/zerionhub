import { LucideWallet } from "lucide-react";
import React from "react";

const BalanceCard = () => {
  return (
    <div className="main-card p-[12px] pb-[20px] flex flex-col justify-between">
      <div className="flex items-center gap-2 text-text-600">
        <LucideWallet className="size-[20px]" />
        <p>Total Balance</p>
      </div>

      <h1 className="text-[40px] font-semibold">$127,390.92</h1>

      <div className="">
        <p className="text-text-600 text-[12px]">Changes</p>
        <p className="text-[green]">$2000 (3.14%)</p>
      </div>
    </div>
  );
};

export default BalanceCard;
