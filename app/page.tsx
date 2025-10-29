"use client";

import { LucideLayoutDashboard, LucideMenu, LucideX } from "lucide-react";
import React from "react";
import Slideshow from "./components/Slideshow";
import AddPostBox from "./components/AddPostBox";
import Post from "./components/Post";
import News from "./components/News";
import ConnectWallet from "./components/ConnectWallet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/types";
import { useActiveAccount } from "thirdweb/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/globalStore";

const Home = () => {
  const { showMenu, setShowMenu } = useGlobalStore();
  const account = useActiveAccount();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", account?.address],
    queryFn: async () => {
      const res = await axios.get("/api/posts");
      return res.data.posts;
    },
    refetchInterval: 1000 * 60,
  });

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full px-[20px] pt-[20px] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucideLayoutDashboard className="size-[24px]" />
          <p className="hidden vsm:inline">Dashboard</p>
        </div>

        <div className="flex gap-2 items-center">
          <ConnectWallet />
          <Button onClick={() => setShowMenu(!showMenu)} className="sm:hidden">
            {showMenu ? <LucideX className="text-[red]" /> : <LucideMenu />}
          </Button>
        </div>
      </header>

      <Slideshow />

      <div className="flex-1 min-h-[100px] flex">
        <div className="w-full lg:w-[70%] h-full flex flex-col border-r border-r-gray-700">
          <AddPostBox />

          <div className="flex-1 overflow-y-auto">
            <div className="h-fit">
              {!isLoading
                ? posts?.map((post: PostType) => (
                    <Post key={post._id} post={post} />
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="pb-[10px]">
                      <Skeleton className="w-full h-[200px]" />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <News />
      </div>
    </div>
  );
};

export default Home;
