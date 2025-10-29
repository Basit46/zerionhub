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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  //Portfolio
  const { data: portfolio } = useQuery({
    queryKey: ["balance", account?.address],
    queryFn: async () => {
      const res = await axios.get(
        `/api/zerion/wallet/${account?.address}/portfolio`
      );
      return res.data.data;
    },
  });

  //NFT
  const { data: nftCount } = useQuery({
    queryKey: ["nft", account?.address],
    queryFn: async () => {
      const res = await axios.get(`/api/zerion/wallet/${account?.address}/nft`);
      return res.data.nftCount;
    },
  });

  //Transactions
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", account?.address],
    queryFn: async () => {
      const res = await axios.get(
        `/api/zerion/wallet/${account?.address}/transactions`
      );
      return res.data.data;
    },
  });

  return (
    <div className="main-card min-h-[200px] lg:min-h-fit relative group">
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

                <div className="mt-[20px]">
                  <h1 className="text-white text-[30px] font-semibold">
                    Portfolio
                  </h1>
                  <div className="w-fit grid grid-cols-2 gap-x-3 gap-y-2">
                    <p className="text-[24px]">
                      ${portfolio?.attributes?.total?.positions?.toFixed(2)}{" "}
                      <span className="text-sm">Total positions</span>
                    </p>

                    <p className="text-[24px]">
                      $
                      {portfolio?.attributes?.positions_distribution_by_type?.wallet?.toFixed(
                        2
                      )}{" "}
                      <span className="text-sm">Wallet balance</span>
                    </p>

                    <p className="text-[24px]">
                      $
                      {portfolio?.attributes?.positions_distribution_by_type?.deposited?.toFixed(
                        2
                      )}{" "}
                      <span className="text-sm">Deposited</span>
                    </p>

                    <p className="text-[24px]">
                      $
                      {portfolio?.attributes?.positions_distribution_by_type?.borrowed?.toFixed(
                        2
                      )}{" "}
                      <span className="text-sm">Borrowed</span>
                    </p>

                    <p className="text-[24px]">
                      $
                      {portfolio?.attributes?.positions_distribution_by_type?.locked?.toFixed(
                        2
                      )}{" "}
                      <span className="text-sm">Locked</span>
                    </p>

                    <p className="text-[24px]">
                      $
                      {portfolio?.attributes?.positions_distribution_by_type?.staked?.toFixed(
                        2
                      )}{" "}
                      <span className="text-sm">Staked</span>
                    </p>
                  </div>
                </div>

                <div className="mt-[30px]">
                  <h1 className="text-white text-[30px] font-semibold">NFTs</h1>
                  <p className="text-[24px]">
                    You currently hold {nftCount?.toLocaleString()} NFT
                    {nftCount > 1 && "s"}
                  </p>
                </div>

                <div className="mt-[30px]">
                  <h1 className="text-white text-[30px] font-semibold">
                    Transactions
                  </h1>
                  <p className="text-[24px]">
                    You have done {transactions?.length?.toLocaleString()}{" "}
                    Transaction
                    {transactions.length > 1 && "s"}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RecapCard;
