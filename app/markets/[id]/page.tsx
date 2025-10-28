"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Chart from "../components/Chart";

const CoinDetails = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [section, setSection] = useState("0");
  const [timeframe, setTimeframe] = useState<"7" | "30" | "365">("365");

  const { data = {}, isLoading } = useQuery({
    queryKey: ["markets", id],
    queryFn: async () => {
      const res = await axios.get(`/api/coins/${id}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="coin-details h-full w-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 w-full px-[30px] py-[20px] border-b border-b-gray-700 flex items-center justify-between">
        <div
          role="button"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <div className="size-[40px] border border-gray-700 rounded-full grid place-items-center">
            <LucideChevronLeft className="size-[20px] text-gray-200" />
          </div>
          <p className="text-[20px] text-gray-200 font-medium">Back</p>
        </div>
      </div>

      <div className="flex-1 w-full px-[30px] flex-col xl:flex-row flex gap-[20px] overflow-y-auto">
        <div className="w-full xl:w-[25%] h-full pr-[30px] pt-[30px] xl:border-r border-r-gray-700 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Image src={data?.image?.small} width={40} height={40} alt="coin" />
            <h1 className="text-[24px] text-gray-200 font-medium">
              {data?.name}{" "}
              <span className="text-[16px] text-gray-200 font-normal">
                {data?.symbol}
              </span>
            </h1>
          </div>
          <div className="mt-[10px] flex items-center gap-[10px]">
            <p className="text-[28px] text-gray-200 font-medium">
              ${data.market_data?.current_price?.usd?.toLocaleString()}
            </p>
            <p
              className={`${
                data?.market_data?.price_change_percentage_24h
                  ?.toString()
                  .includes("-")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {data?.market_data?.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className="text-gray-200">(24h)</p>
          </div>

          <div className="mt-[40px] flex flex-col gap-[15px]">
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">Market Cap</p>
              <p className="font-medium">
                ${data?.market_data?.market_cap?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">Fully Diluted Valuation</p>
              <p className="font-medium">
                $
                {data?.market_data?.fully_diluted_valuation?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">Total Volume</p>
              <p className="font-medium">
                ${data?.market_data?.total_volume?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">All Time High</p>
              <p className="font-medium">
                ${data?.market_data?.ath?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">All Time Low</p>
              <p className="font-medium">
                ${data?.market_data?.atl?.usd?.toLocaleString()}
              </p>
            </div>
            <div className="w-full flex items-center justify-between pb-[15px] border-b border-b-gray-600">
              <p className="text-gray-200">Total Supply</p>
              <p className="font-medium">
                ${data?.market_data?.total_supply?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-1 h-full py-[30px] pb-[40px] flex-col space-y-[20px]">
          <div className="flex flex-col xl:flex-row justify-between items-center">
            <div className="chart-btns w-fit h-[40px] bg-gray-700 px-[4px] py-[4px] rounded-[8px] flex items-center gap-2">
              <button
                onClick={() => setSection("0")}
                className={section == "0" ? "active" : ""}
              >
                Price
              </button>
              <button
                onClick={() => setSection("1")}
                className={section == "1" ? "active" : ""}
              >
                Market Cap
              </button>
              <button
                onClick={() => setSection("2")}
                className={section == "2" ? "active" : ""}
              >
                Total Volume
              </button>
            </div>

            <div className="chart-btns w-fit h-[40px] bg-gray-700 px-[4px] py-[4px] rounded-[8px] flex items-center gap-2">
              <button
                onClick={() => setTimeframe("7")}
                className={timeframe == "7" ? "active" : ""}
              >
                7 days
              </button>
              <button
                onClick={() => setTimeframe("30")}
                className={timeframe == "30" ? "active" : ""}
              >
                1 month
              </button>
              <button
                onClick={() => setTimeframe("365")}
                className={timeframe == "365" ? "active" : ""}
              >
                1 year
              </button>
            </div>
          </div>

          <div className="h-[500px] xl:h-full w-full">
            <Chart
              timeframe={timeframe}
              section={
                section == "0"
                  ? "prices"
                  : section == "1"
                  ? "market_caps"
                  : "total_volumes"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
