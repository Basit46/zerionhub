"use client";

import Image from "next/image";
import React from "react";
import ConnectWallet from "./ConnectWallet";

const Welcome = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src="/logo-raw.png" width={28} height={28} alt="logo" />
        <p className="text-white text-[20px] font-medium">ZerionHub</p>
      </div>
      <ConnectWallet />
    </div>
  );
};

export default Welcome;
