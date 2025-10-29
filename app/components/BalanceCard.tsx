import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideWallet } from "lucide-react";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const BalanceCard = () => {
  const account = useActiveAccount();

  const { data: portfolio } = useQuery({
    queryKey: ["balance", account?.address],
    queryFn: async () => {
      const res = await axios.get(
        `/api/zerion/wallet/${account?.address}/portfolio`
      );
      return res.data.data;
    },
  });

  return (
    // <div className="main-card min-h-[200px] lg:min-h-fit p-[12px] pb-[20px] flex flex-col justify-between">
    //   <div className="flex items-center gap-2 text-text-600">
    //     <LucideWallet className="size-[20px]" />
    //     <p>Total Balance</p>
    //   </div>

    //   <h1 className="text-[40px] font-semibold">
    //     ${portfolio?.attributes?.total?.positions?.toFixed(2)}
    //   </h1>

    //   <div className="">
    //     <p className="text-text-600 text-[12px]">24h Changes</p>
    //     <p className="text-green-600">
    //       ${portfolio?.attributes?.changes?.absolute_1d?.toFixed(2)} (
    //       {portfolio?.attributes?.changes?.percent_1d?.toFixed(2) || 0}%)
    //     </p>
    //   </div>
    // </div>
    <div className="main-card min-h-[200px] lg:min-h-fit p-[12px] pb-[20px] flex flex-col justify-between">
      <div className="flex items-center gap-2 text-text-600">
        <LucideWallet className="size-[20px]" />
        <p>Total Balance</p>
      </div>

      <h1 className="text-[40px] font-semibold">$200</h1>

      <div className="">
        <p className="text-text-600 text-[12px]">24h Changes</p>
        <p className="text-green-600">$0.00 (0%)</p>
      </div>
    </div>
  );
};

export default BalanceCard;
