"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Sidebar from "./Sidebar";
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { useGlobalStore } from "@/store/globalStore";
import Welcome from "./Welcome";

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const { hideSideBar } = useGlobalStore();
  const account = useActiveAccount();

  return (
    <QueryClientProvider client={queryClient}>
      {account ? (
        <>
          <div className="flex w-full h-full">
            <Sidebar />
            <div
              className={`${
                !hideSideBar ? "w-[calc(100vw-300px)]" : "w-full"
              } h-full overflow-y-auto`}
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <Welcome />
      )}
    </QueryClientProvider>
  );
};

export default RootLayoutContent;
