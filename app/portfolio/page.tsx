"use client";

import { client } from "@/thirdwebClient";
import { LucideLayoutDashboard, LucidePieChart } from "lucide-react";
import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import Slideshow from "../components/Slideshow";
import BalanceCard from "../components/BalanceCard";
import AssetsCard from "../components/AssetsCard";
import RecapCard from "../components/RecapCard";
import TransactionsCard from "../components/TransactionsCard";
import PortfolioChartCard from "../components/PortfolioChartCard";

const Home = () => {
  return (
    <div className="w-full">
      <header className="w-full px-[20px] pt-[20px] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucidePieChart className="size-[24px]" />
          <p>Portfolio</p>
        </div>

        <ConnectButton
          client={client}
          wallets={[createWallet("io.zerion.wallet")]}
          theme={"dark"}
        />
      </header>

      <Slideshow />

      <div className="p-5 grid gap-5">
        <div className="flex gap-5 h-[240px]">
          <BalanceCard />
          <AssetsCard />
          <RecapCard />
        </div>

        <div className="grid grid-cols-[60%_auto] gap-5 h-[400px]">
          <PortfolioChartCard />
          <TransactionsCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
