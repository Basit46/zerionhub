"use client";

import { Input } from "@/components/ui/input";
import { useGlobalStore } from "@/store/globalStore";
import {
  LucideChartCandlestick,
  LucideLayoutDashboard,
  LucideLifeBuoy,
  LucidePieChart,
  LucideSearch,
  LucideSidebar,
  LucideSparkles,
  LucideTrophy,
  LucideUsers2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hideSideBar, setHideSideBar } = useGlobalStore();

  const handleSidebarToggle = () => {
    if (!hideSideBar) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  return (
    <div
      className={`${
        !hideSideBar ? "w-[300px]" : "w-[86px]"
      } sticky top-0 shrink-0 h-screen p-[20px] pt-[30px] flex flex-col items-center border-r-[0.5px] border-r-gray-600 duration-300`}
    >
      <div className="w-full flex items-center justify-center">
        {!hideSideBar && (
          <div className="flex-1 flex items-center gap-2">
            <Image src="/logo-raw.png" width={28} height={28} alt="logo" />
            <p className="text-white text-[20px] font-medium">ZerionHub</p>
          </div>
        )}

        <button onClick={handleSidebarToggle}>
          <LucideSidebar className="text-gray-500 hover:text-aqua-900 duration-200" />
        </button>
      </div>

      <div
        className={`${
          hideSideBar ? "opacity-0 pointer-events-none" : ""
        } mt-[20px] relative w-full`}
      >
        <LucideSearch className="absolute top-1/2 -translate-y-1/2 left-[8px] text-gray-300 size-[18px]" />
        <Input className="pl-[30px]" placeholder="Search..." />
      </div>

      <div className="w-full mt-[20px] flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className={pathname == "/" ? "navlink active" : "navlink"}
          >
            <LucideLayoutDashboard />
            {!hideSideBar && <p>Dashboard</p>}
          </Link>

          <Link
            href="/portfolio"
            className={
              pathname.startsWith("/portfolio") ? "navlink active" : "navlink"
            }
          >
            <LucidePieChart />

            {!hideSideBar && <p>Portfolio</p>}
          </Link>

          <Link
            href="/markets"
            className={
              pathname.startsWith("/markets") ? "navlink active" : "navlink"
            }
          >
            <LucideChartCandlestick />
            {!hideSideBar && <p>Markets</p>}
          </Link>

          <Link
            href="/ai"
            className={
              pathname.startsWith("/ai") ? "navlink active" : "navlink"
            }
          >
            <LucideSparkles />

            {!hideSideBar && <p>AI Insights</p>}
          </Link>

          <Link
            href="/leaderboard"
            className={
              pathname.startsWith("/leaderboard") ? "navlink active" : "navlink"
            }
          >
            <LucideTrophy />

            {!hideSideBar && <p>Leaderboard</p>}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/community" className="navlink">
            <LucideUsers2 />

            {!hideSideBar && <p>Zerion Community</p>}
          </Link>
          <Link href="/help" className="navlink">
            <LucideLifeBuoy />

            {!hideSideBar && <p>Help Center</p>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
