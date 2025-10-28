"use client";

import { LucideMenu, LucidePieChart, LucideX } from "lucide-react";
import React from "react";
import Slideshow from "../components/Slideshow";
import BalanceCard from "../components/BalanceCard";
import AssetsCard from "../components/AssetsCard";
import RecapCard from "../components/RecapCard";
import TransactionsCard from "../components/TransactionsCard";
import PortfolioChartCard from "../components/PortfolioChartCard";
import ConnectWallet from "../components/ConnectWallet";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/globalStore";

const Home = () => {
  const { showMenu, setShowMenu } = useGlobalStore();

  return (
    <div className="w-full">
      <header className="w-full px-[20px] pt-[20px] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucidePieChart className="size-[24px]" />
          <p>Portfolio</p>
        </div>

        <div className="flex gap-2 items-center">
          <ConnectWallet />
          <Button onClick={() => setShowMenu(!showMenu)} className="sm:hidden">
            {showMenu ? <LucideX className="text-[red]" /> : <LucideMenu />}
          </Button>
        </div>
      </header>

      <Slideshow />

      <div className="p-5 grid gap-5">
        <div className="flex flex-col lg:flex-row gap-5 min-h-[240px]">
          <BalanceCard />
          <AssetsCard />
          <RecapCard />
        </div>

        <div className="flex flex-col xl:grid grid-cols-[60%_auto] gap-5 h-fit xl:h-[400px]">
          <PortfolioChartCard />
          <TransactionsCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
