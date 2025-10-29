"use client";

import { Badge } from "@/components/ui/badge";
import { truncateAddress } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideArrowRight, LucideLogs } from "lucide-react";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const TransactionsCard = () => {
  const account = useActiveAccount();

  // const { data = [] } = useQuery({
  //   queryKey: ["transactions", account?.address],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `/api/zerion/wallet/${account?.address}/transactions`
  //     );
  //     return res.data.data;
  //   },
  // });

  const data = [
    {
      from: "0x3fA1b2C4D5e6F7890aBcD1234567890efABcDEF0",
      to: "0x9B2c3D4e5F6a78901BcDEf234567890aBcDEF1234",
      amount: "0.7543",
      symbol: "ETH",
    },
    {
      from: "0x7A1bB2c3D4E5f67890AbCd1234567890efABCd12",
      to: "0x2c3D4E5f6A78901bCDef234567890aBCDef345678",
      amount: "1200",
      symbol: "USDT",
    },
    {
      from: "0xAa11Bb22Cc33Dd44Ee55Ff66778899aAbBcCdDeE",
      to: "0xBb22Cc33Dd44Ee55Ff66AAbb778899aAbcCdDeEf0",
      amount: "3.125",
      symbol: "ETH",
    },
    {
      from: "0xC0ffeeC0FFeeC0FFeE00FfEe00C0ffeeC0FFeE01",
      to: "0xD1e2F3a4B5c6D7E8f9A0b1C2d3E4f5A6b7C8d9E0",
      amount: "0.01",
      symbol: "WBTC",
    },
    {
      from: "0x1111222233334444555566667777888899990000",
      to: "0x9999000088887777666655554444333322221111",
      amount: "450.5",
      symbol: "USDC",
    },
    {
      from: "0x0a0b0c0d0e0f1011121314151617181920212223",
      to: "0x3a3b3c3d3e3f404142434445464748494a4b4c4d",
      amount: "75",
      symbol: "LINK",
    },
    {
      from: "0x5c5d5e5f606162636465666768696a6b6c6d6e6f",
      to: "0x6f6e6d6c6b6a696867666564636261605f5e5d5c5b",
      amount: "0.00085",
      symbol: "BTC",
    },
    {
      from: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      to: "0xbcdefabcdefabcdefabcdefabcdefabcdefabcde",
      amount: "20000",
      symbol: "USDT",
    },
    {
      from: "0x1234567890abcdef1234567890abcdef12345678",
      to: "0x87654321fedcba0987654321fedcba0987654321",
      amount: "8.5",
      symbol: "AAVE",
    },
    {
      from: "0xf00bf00bf00bf00bf00bf00bf00bf00bf00bf00bf",
      to: "0x00bf00bf00bf00bf00bf00bf00bf00bf00bf00bf0",
      amount: "1500.75",
      symbol: "DAI",
    },
    {
      from: "0x22223333444455556666777788889999aaaabbbb",
      to: "0xbbbbccccddddeeeeffff00001111222233334444",
      amount: "0.3333",
      symbol: "ETH",
    },
    {
      from: "0xCAFEBABECAFEBABECAFEBABECAFEBABECAFEBABE",
      to: "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
      amount: "42",
      symbol: "UNI",
    },
    {
      from: "0x9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f",
      to: "0x8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e",
      amount: "0.0025",
      symbol: "WBTC",
    },
    {
      from: "0xa1b2c3d4e5f60123456789abcdefabcdefabcd00",
      to: "0xb1c2d3e4f506123456789abcdefabcdefabcd0011",
      amount: "600",
      symbol: "MATIC",
    },
    {
      from: "0x444455556666777788889999aaaabbbbccccdddd",
      to: "0xddddccccbbbbaaa999988887777666655554444",
      amount: "9999.999",
      symbol: "USDC",
    },
    {
      from: "0xfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed",
      to: "0xbeeefbeefbeefbeefbeefbeefbeefbeefbeefbee",
      amount: "1.23456789",
      symbol: "ETH",
    },
    {
      from: "0x1357913579135791357913579135791357913579",
      to: "0x9753197531975319753197531975319753197531",
      amount: "250",
      symbol: "LINK",
    },
    {
      from: "0xabcdef0123456789abcdef0123456789abcdef01",
      to: "0x0123456789abcdef0123456789abcdef01234567",
      amount: "0.05",
      symbol: "BTC",
    },
    {
      from: "0x0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f",
      to: "0xf0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0",
      amount: "33.33",
      symbol: "DAI",
    },
    {
      from: "0x9999888877776666555544443333222211110000",
      to: "0x1111000022223333444455556666777788889999",
      amount: "5",
      symbol: "ETH",
    },
  ];

  return (
    <div className="main-card h-[400px] lg:min-h-fit p-[12px] flex flex-col gap-[20px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideLogs className="size-[20px]" />
        <p>Recent transactions</p>
      </div>

      {/* <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit flex flex-col gap-[8px]">
          {data?.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between pb-[4px] border-b border-b-gray-600 text-sm"
            >
              <div className="flex items-center gap-3">
                <p className="">
                  {truncateAddress(item?.attributes?.transfers[0]?.sender)}
                </p>
                <Badge variant={"secondary"} className="gap-1">
                  <LucideArrowRight className="size-[12px]" />
                </Badge>
                <p className="">
                  {truncateAddress(item?.attributes?.transfers[0]?.recipient)}
                </p>
              </div>

              <p>
                {item?.attributes?.transfers[0]?.quantity?.float}{" "}
                {item?.attributes?.transfers[0]?.fungible_info?.symbol}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit flex flex-col gap-[8px]">
          {data?.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between pb-[4px] border-b border-b-gray-600 text-sm"
            >
              <div className="flex items-center gap-3">
                <p className="">{truncateAddress(item?.from)}</p>
                <Badge variant={"secondary"} className="gap-1">
                  <LucideArrowRight className="size-[12px]" />
                </Badge>
                <p className="">{truncateAddress(item?.to)}</p>
              </div>

              <p>
                {item?.amount} {item?.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
