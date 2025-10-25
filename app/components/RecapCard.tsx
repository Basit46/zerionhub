import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const RecapCard = () => {
  return (
    <div className="main-card relative group">
      <Image
        src="/recapBg.png"
        fill
        className="w-full h-full object-cover group-hover:scale-[1.5] group-hover:rotate-[10deg] duration-200"
        alt="recap"
        sizes="400px"
        priority
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-[10px] p-[20px]">
        <h1 className="w-fit font-bold text-[50px] leading-none">
          Your October
          <br />
          Recap
        </h1>

        <Button className="w-fit">View</Button>
      </div>
    </div>
  );
};

export default RecapCard;
