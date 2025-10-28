"use client";

import { Input } from "@/components/ui/input";
import { useGlobalStore } from "@/store/globalStore";
import {
  LucideArrowUpRightFromCircle,
  LucideArrowUpRightFromSquare,
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
  const { hideSideBar, setHideSideBar, showMenu, setShowMenu } =
    useGlobalStore();

  const handleSidebarToggle = () => {
    if (!hideSideBar) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  return (
    <div
      className={`${showMenu ? "sm:flex" : "hidden sm:flex"} ${
        !hideSideBar ? "w-[86px] xl:w-[300px]" : "w-[86px]"
      } z-[20] fixed sm:sticky top-0 shrink-0 h-screen p-[20px] pt-[30px] flex flex-col items-center border-r-[0.5px] border-r-gray-400 md:border-r-gray-600 bg-black/60 backdrop-blur-[10px] sm:bg-transparent sm:backdrop-blur-none`}
    >
      {/* Overlay */}
      <div
        role="button"
        onClick={() => setShowMenu(false)}
        className="fixed sm:hidden inset-0 h-screen w-screen"
      ></div>
      <div className="w-full flex items-center justify-center">
        {!hideSideBar && (
          <div className="hidden xl:flex flex-1 items-center gap-2 duration-500 delay-1000">
            <Image src="/logo-raw.png" width={28} height={28} alt="logo" />
            <p className="text-white text-[20px] font-medium">ZerionHub</p>
          </div>
        )}

        <Image
          className="block xl:hidden"
          src="/logo-raw.png"
          width={28}
          height={28}
          alt="logo"
        />
        <button className="hidden xl:block" onClick={handleSidebarToggle}>
          <LucideSidebar className="text-gray-500 hover:text-aqua-900 duration-200" />
        </button>
      </div>

      <div
        className={`${
          hideSideBar ? "opacity-0 pointer-events-none" : ""
        } hidden xl:flex mt-[20px] relative w-full bg-gray-800 h-[36px] rounded-[8px] items-center px-[10px]`}
      >
        <p className="text-sm">
          Built with ❤️ by{" "}
          <a
            className="underline text-aqua-500"
            href="http://x.com/Basit_js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Basit
          </a>{" "}
          for Zerion
        </p>
      </div>

      <div className="w-full mt-[30px] flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            onClick={() => setShowMenu(false)}
            className={pathname == "/" ? "navlink active" : "navlink"}
          >
            <LucideLayoutDashboard />
            {!hideSideBar && <p className="hidden xl:block">Dashboard</p>}
          </Link>

          <Link
            href="/portfolio"
            onClick={() => setShowMenu(false)}
            className={
              pathname.startsWith("/portfolio") ? "navlink active" : "navlink"
            }
          >
            <LucidePieChart />

            {!hideSideBar && <p className="hidden xl:block">Portfolio</p>}
          </Link>

          <Link
            href="/markets"
            onClick={() => setShowMenu(false)}
            className={
              pathname.startsWith("/markets") ? "navlink active" : "navlink"
            }
          >
            <LucideChartCandlestick />
            {!hideSideBar && <p className="hidden xl:block">Markets</p>}
          </Link>

          <Link
            href="/ai"
            onClick={() => setShowMenu(false)}
            className={
              pathname.startsWith("/ai") ? "navlink active" : "navlink"
            }
          >
            <LucideSparkles />

            {!hideSideBar && <p className="hidden xl:block">AI Insights</p>}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="https://x.com/zerion"
            target="blank"
            rel="noopener noreferrer"
            className="navlink"
            onClick={() => setShowMenu(false)}
          >
            <LucideUsers2 />
            {!hideSideBar && (
              <p className="hidden xl:block">Zerion Community</p>
            )}
            {!hideSideBar && (
              <LucideArrowUpRightFromSquare className="hidden xl:block" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
