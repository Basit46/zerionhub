"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideDownload } from "lucide-react";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useActiveAccount } from "thirdweb/react";

const RecapCard = () => {
  const account = useActiveAccount();

  const modalRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleDownload = async () => {
    if (!modalRef.current) return;
    try {
      if (btnRef.current) btnRef.current.style.display = "none";

      const dataUrl = await htmlToImage.toPng(modalRef.current, {
        cacheBust: true,
        backgroundColor: "#000",
      });

      if (btnRef.current) btnRef.current.style.display = "flex";

      const link = document.createElement("a");
      link.download = "portfolio-recap.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      if (btnRef.current) btnRef.current.style.display = "flex";
    }
  };

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
          Your Portfolio
          <br />
          Wrapped
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit">View</Button>
          </DialogTrigger>

          <DialogContent className="w-[80vw] h-[80vh] bg-black max-w-full p-0 border-none outline-none rounded-[20px] overflow-hidden">
            <div ref={modalRef} className="relative w-full h-full">
              <VisuallyHidden>
                <DialogTitle>Portfolio Recap</DialogTitle>
              </VisuallyHidden>

              <Image
                src="/recap-bg.png"
                fill
                className="h-full w-full object-cover"
                priority
                alt="recap"
              />

              <div className="absolute inset-0 w-full h-full z-[2] pl-[40px] pt-[40px]">
                <div className="absolute top-[10px] left-[10px] flex items-center justify-center gap-2">
                  <Image
                    src="/logo-raw.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <p className="text-white tex font-medium">ZerionHub</p>
                </div>

                <Button
                  ref={btnRef}
                  onClick={handleDownload}
                  className="absolute bottom-[20px] right-[20px]"
                >
                  <p>Download</p>
                  <LucideDownload />
                </Button>

                <h1 className="mt-[20px] text-white text-[30px] font-bold italic">
                  {account?.address}
                </h1>
                <p className="font-bold">Wrapped</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RecapCard;
