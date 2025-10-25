"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Sidebar from "./Sidebar";
import { ThirdwebProvider } from "thirdweb/react";
import { useGlobalStore } from "@/store/globalStore";

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const { hideSideBar } = useGlobalStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <div className="flex w-full h-full">
          <Sidebar />
          <div
            className={`${
              !hideSideBar ? "w-[calc(100vw-300px)]" : "w-full"
            } h-full overflow-y-scroll`}
          >
            {children}
          </div>
        </div>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};

export default RootLayoutContent;
